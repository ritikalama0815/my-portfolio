/**
 * In-memory cache of optimized gallery image URLs.
 * Key format: `${src}::${maxSize}` → Promise<{ url, width, height }>.
 * @type {Map<string, Promise<{ url: string, width: number, height: number }>>}
 */
const blobUrlCache = new Map();

/**
 * Builds a stable cache key for a source URL and max dimension.
 * @param {string} src - Original image URL or imported asset path
 * @param {number} maxSize - Max width/height in pixels after optimization
 * @returns {string}
 */
function cacheKey(src, maxSize) {
  return `${src}::${maxSize}`;
}

/**
 * Loads an image via the browser Image API.
 * @param {string} url
 * @returns {Promise<HTMLImageElement>}
 */
function loadImageElement(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Fetches an image as a Blob with optional download progress (0–85%).
 * @param {string} url
 * @param {(progress: number | null) => void} [onProgress] - Percent, or null if length is unknown
 * @returns {Promise<Blob>}
 */
function fetchImageBlob(url, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';

    xhr.onprogress = (event) => {
      if (!onProgress) return;
      if (event.lengthComputable && event.total > 0) {
        onProgress(Math.min(99, Math.round((event.loaded / event.total) * 85)));
      } else {
        onProgress(null);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress?.(85);
        resolve(xhr.response);
      } else {
        reject(new Error(`Failed to load image (${xhr.status})`));
      }
    };

    xhr.onerror = () => reject(new Error('Failed to load image'));
    xhr.send();
  });
}

/**
 * Downscales a blob to fit within maxSize (JPEG) when needed.
 * @param {Blob} blob
 * @param {number} maxSize
 * @param {(progress: number) => void} [onProgress]
 * @returns {Promise<{ url: string, width: number, height: number, revoke: boolean }>}
 */
async function optimizeImageBlob(blob, maxSize, onProgress) {
  const objectUrl = URL.createObjectURL(blob);

  try {
    onProgress?.(88);
    const img = await loadImageElement(objectUrl);
    let { naturalWidth: w, naturalHeight: h } = img;

    if (w <= maxSize && h <= maxSize) {
      onProgress?.(100);
      return { url: objectUrl, width: w, height: h, revoke: true };
    }

    onProgress?.(92);
    const scale = maxSize / Math.max(w, h);
    w = Math.floor(w * scale);
    h = Math.floor(h * scale);

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').drawImage(img, 0, 0, w, h);

    onProgress?.(96);

    const optimizedUrl = await new Promise((resolve) => {
      canvas.toBlob(
        (optimizedBlob) => {
          if (!optimizedBlob) {
            resolve(objectUrl);
            return;
          }
          resolve(URL.createObjectURL(optimizedBlob));
        },
        'image/jpeg',
        0.9
      );
    });

    URL.revokeObjectURL(objectUrl);
    onProgress?.(100);
    return { url: optimizedUrl, width: w, height: h, revoke: false };
  } catch (error) {
    URL.revokeObjectURL(objectUrl);
    throw error;
  }
}

/**
 * Fetches and optimizes an image; falls back to Image + canvas if XHR fails.
 * @param {string} src
 * @param {number} maxSize
 * @param {(progress: number | null) => void} [onProgress]
 * @returns {Promise<{ url: string, width: number, height: number, revoke: boolean }>}
 */
async function loadAndOptimize(src, maxSize, onProgress) {
  onProgress?.(0);

  try {
    const blob = await fetchImageBlob(src, onProgress);
    return optimizeImageBlob(blob, maxSize, onProgress);
  } catch {
    onProgress?.(40);
    const img = await loadImageElement(src);
    let { naturalWidth: w, naturalHeight: h } = img;

    if (w <= maxSize && h <= maxSize) {
      onProgress?.(100);
      return { url: src, width: w, height: h, revoke: false };
    }

    onProgress?.(70);
    const scale = maxSize / Math.max(w, h);
    w = Math.floor(w * scale);
    h = Math.floor(h * scale);

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').drawImage(img, 0, 0, w, h);

    onProgress?.(90);

    const url = await new Promise((resolve) => {
      canvas.toBlob(
        (optimizedBlob) => {
          if (!optimizedBlob) {
            resolve(src);
            return;
          }
          resolve(URL.createObjectURL(optimizedBlob));
        },
        'image/jpeg',
        0.9
      );
    });

    onProgress?.(100);
    return { url, width: w, height: h, revoke: false };
  }
}

/**
 * Returns a display URL for an image, cached by src + maxSize.
 * Prefer this for gallery modals so large files are downscaled once.
 *
 * @param {string} src - Image source URL
 * @param {number} [maxSize=1400] - Longest edge in pixels
 * @param {{ onProgress?: (progress: number | null) => void }} [options]
 * @returns {Promise<{ url: string, width: number, height: number }>}
 *
 * @example
 * const { url } = await getCachedDisplayUrl(artwork.image, 1400, {
 *   onProgress: (p) => setLoadProgress(p ?? 0),
 * });
 */
export function getCachedDisplayUrl(src, maxSize = 1400, options = {}) {
  const { onProgress } = options;
  const key = cacheKey(src, maxSize);

  if (blobUrlCache.has(key)) {
    return blobUrlCache.get(key).then((result) => {
      onProgress?.(100);
      return result;
    });
  }

  const promise = loadAndOptimize(src, maxSize, onProgress).then(({ url, width, height }) => ({
    url,
    width,
    height,
  }));

  blobUrlCache.set(key, promise);
  return promise;
}

/**
 * Warm the cache for a list of gallery URLs (fire-and-forget).
 * @param {string[]} urls
 * @param {number} [maxSize=1400]
 */
export function preloadGalleryImages(urls, maxSize = 1400) {
  urls.forEach((url) => {
    getCachedDisplayUrl(url, maxSize).catch(() => {});
  });
}

/**
 * Prefetch the selected artwork and a few neighbors (±2) for smooth prev/next.
 * @param {string[]} urls
 * @param {number | null} centerIndex - Index of the open artwork, or null
 * @param {number} [maxSize=1400]
 */
export function preloadGalleryNeighbors(urls, centerIndex, maxSize = 1400) {
  if (centerIndex === null || centerIndex < 0) return;
  const len = urls.length;
  if (!len) return;

  const offsets = [0, 1, -1, 2, -2];
  offsets.forEach((offset) => {
    const index = (centerIndex + offset + len) % len;
    getCachedDisplayUrl(urls[index], maxSize).catch(() => {});
  });
}
