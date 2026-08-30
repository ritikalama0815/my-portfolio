const blobUrlCache = new Map();

function cacheKey(src, maxSize) {
  return `${src}::${maxSize}`;
}

function loadImageElement(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

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

    const optimizedUrl = await new Promise((resolve, reject) => {
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

    const url = await new Promise((resolve, reject) => {
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

export function preloadGalleryImages(urls, maxSize = 1400) {
  urls.forEach((url) => {
    getCachedDisplayUrl(url, maxSize).catch(() => {});
  });
}

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
