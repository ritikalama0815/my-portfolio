import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import CircularGallery from '../components/CircularGallery';
import TextType from '../components/TextType';
import GlitchPageLayout from '../components/GlitchPageLayout';
import { getCachedDisplayUrl, preloadGalleryImages, preloadGalleryNeighbors } from '../utils/imageCache';
import {
  ai,
  sandbina,
  columbina,
  venti,
  cat,
  forest,
  father,
  girl,
  illumi,
  maomao,
  blueberry,
  scaramouche,
  nahihi,
  flins,
  kagura,
} from '../assets/images';

/**
 * Artwork catalog for the Arts gallery.
 * `text` is the label under each carousel slide; `title` / `year` / `description` appear in the modal.
 *
 * @type {{
 *   id: number,
 *   title: string,
 *   image: string,
 *   text: string,
 *   description: string,
 *   year: string,
 *   artist?: string
 * }[]}
 */
const ARTWORKS = [
  {id: 1, title: 'Columbina and Sandrone', image: sandbina, text: 'Columbina and Sandrone', description: 'i saw an epic pose reference on tiktok, and drew this based on that reference.', year: '2026'},
  { id: 2, title: 'Columbina', image: columbina, text: 'Columbina', description: 'you can tell she is my favourite character.', year: '2026' },
  { id: 3, title: 'Cat', image: cat, text: 'Cat', description: 'i drew cat sleeping because they look so cute', year: '2025' },
  { id: 4, title: 'Venti', image: venti, text: 'Venti', description: 'he is a free-spirited bard, but what story could be hidden under there?', year: '2026' },
  { id: 5, title: 'Forest', image: forest, text: 'Forest', description: 'i dream of getting lost in eerie forest sometimes, and it sends chill down my spine when i wake up', year: '2025' },
  {
    id: 6,
    title: 'Illumi',
    image: illumi,
    text: 'Illumi',
    description:
      'his transformation from being ugly 100 pierced robot to promoting shampoo in the show was crazy',
    year: '2025'
  },
  { id: 7, title: 'Arlecchino', image: father, text: 'Arlecchino', description: 'she is head of an orphanage. surely she can\'t be bad, right?...RIGHT.', year: '2025' },
  {
    id: 8,
    title: 'Mao Mao',
    image: maomao,
    text: 'Mao Mao',
    description:
      'descends from one of the major clans, is super talented apothecary, is liked by emperor, emperor\'s son(brother), concubines, empress, and many other, but still thinks herself as lowly birth. ',
    year: '2025'
  },
  { id: 10, title: 'Character Potray study', image: girl, text: 'girl', description: 'i want to draw like artists from rednote. this is just practice of their art style, which flopped badly.', year: '2026'},
  {
    id: 11,
    title: 'Scaramouche',
    image: scaramouche,
    text: 'Scaramouche',
    description:
      'Who? \n (the joke is that he is deleted from the database)',
    year: '2025'
  },
  {
    id: 12,
    title: 'Ai',
    image: ai,
    text: 'Ai',
    description:
      'character is cute and loved but the story is garbage.',
    year: '2025',
  },
  { id: 13, title: 'Nahihi', image: nahihi, text: 'Nahihi', description: 'very smart and is a living database. ask her anything, she may hide somethings but she knows it all.', year: '2026' },
  { id: 14, title: 'Flins', image: flins, text: 'Flins', description: 'he invites guests to the cemetry, not his house. Funny big lad.', year: '2026' },
  { id: 15, title: 'Kagura', image: kagura, text: 'Frieren', description: 'strong, funny, gluttonous. beef or fish? beef AND fish', year: '2026' },
  {
    id: 16,
    title: 'Blueberry',
    image: blueberry,
    text: 'Blueberry',
    description: 'Why is blueberry called blueberry but strawberry not called redberry?',
    year: '2025',
    artist: 'Ritika Lama',
  },
  
];

/**
 * Full-screen artwork viewer: centered image (not full viewport) + info box on the right.
 * Keyboard: Escape closes, ArrowLeft/ArrowRight navigate.
 *
 * @param {object} props
 * @param {{ id: number, title: string, image: string, description: string, year: string }} props.artwork
 * @param {() => void} props.onClose
 * @param {() => void} props.onPrev
 * @param {() => void} props.onNext
 * @returns {JSX.Element}
 */
function GalleryModal({ artwork, onClose, onPrev, onNext }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [indeterminate, setIndeterminate] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    let cancelled = false;
    let indeterminateTimer;

    setImageLoading(true);
    setImageSrc(null);
    setLoadProgress(0);
    setIndeterminate(false);

    indeterminateTimer = window.setTimeout(() => {
      if (!cancelled) setIndeterminate(true);
    }, 400);

    getCachedDisplayUrl(artwork.image, 1400, {
      onProgress: (value) => {
        if (cancelled || value === null) return;
        setIndeterminate(false);
        setLoadProgress(value);
      },
    })
      .then(({ url }) => {
        if (!cancelled) {
          setImageSrc(url);
          setLoadProgress(100);
          setImageLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setImageSrc(artwork.image);
          setLoadProgress(100);
          setImageLoading(false);
        }
      });

    return () => {
      cancelled = true;
      window.clearTimeout(indeterminateTimer);
    };
  }, [artwork.image]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden />

      <motion.button
        type="button"
        className="absolute z-20 p-2 text-white transition rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/20 top-4 right-4 sm:top-6 sm:right-6"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        whileHover={{ scale: 1.08, rotate: 90 }}
        aria-label="Close"
      >
        <X size={22} />
      </motion.button>

      <motion.button
        type="button"
        className="absolute z-20 p-3 text-white transition -translate-y-1/2 rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/20 left-2 top-1/2 sm:left-6"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Previous artwork"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        type="button"
        className="absolute z-20 p-3 text-white transition -translate-y-1/2 rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/20 right-2 top-1/2 sm:right-6"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Next artwork"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      <motion.div
        className="relative z-10 flex flex-col items-center w-full max-w-5xl gap-5 lg:flex-row lg:items-center lg:justify-center lg:gap-8"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center shrink-0">
          {imageLoading ? (
            <div
              className="flex h-[min(48vh,420px)] w-[min(72vw,340px)] flex-col items-center justify-center gap-4 rounded-sm bg-slate-900/80 px-4 sm:w-[min(52vw,380px)]"
              aria-live="polite"
              aria-busy="true"
            >
              <div className="gallery-skeleton relative h-[min(34vh,300px)] w-full overflow-hidden rounded-sm bg-slate-800/90">
                <div className="absolute inset-0 gallery-skeleton-shimmer" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-2 rounded-full animate-spin border-slate-600 border-t-emerald-400" />
                </div>
              </div>
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Loading artwork</span>
                  <span>{loadProgress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-700/80">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300 ${
                      indeterminate ? 'gallery-progress-indeterminate w-1/3' : ''
                    }`}
                    style={indeterminate ? undefined : { width: `${loadProgress}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            imageSrc && (
              <motion.img
                key={imageSrc}
                src={imageSrc}
                alt={artwork.title}
                className="max-h-[min(58vh,480px)] w-auto max-w-[min(72vw,380px)] rounded-sm border-2 border-white object-contain drop-shadow-2xl sm:max-w-[min(52vw,420px)]"
                decoding="async"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )
          )}
        </div>

        <div className="relative w-full max-w-sm lg:max-w-xs xl:max-w-sm">
          <div
            className="absolute left-0 z-10 hidden w-4 h-4 rotate-45 -translate-x-1/2 -translate-y-1/2 bg-white shadow-sm lg:block top-1/2"
            aria-hidden
          />
          <div className="px-5 py-5 text-left bg-white border rounded-lg shadow-xl border-white/20 sm:px-6 sm:py-6">
            <h2 className="text-lg font-semibold leading-snug text-slate-900 sm:text-xl">
              {artwork.title} ({artwork.year})
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {artwork.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Arts / Gallery page: curved WebGL carousel with expand modal.
 * Preloads images via {@link preloadGalleryImages} and neighbors when a piece is open.
 *
 * @returns {JSX.Element}
 */
export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const carouselItems = useMemo(
    () => ARTWORKS.map(({ image, text }) => ({ image, text })),
    []
  );

  const artworkUrls = useMemo(() => ARTWORKS.map((art) => art.image), []);

  useEffect(() => {
    preloadGalleryImages(artworkUrls);
  }, [artworkUrls]);

  useEffect(() => {
    preloadGalleryNeighbors(artworkUrls, selectedIndex);
  }, [selectedIndex, artworkUrls]);

  const selectedArtwork = selectedIndex !== null ? ARTWORKS[selectedIndex] : null;

  /** Advance to the next artwork (wraps). */
  const goNext = useCallback(() => {
    setSelectedIndex((i) => (i === null ? 0 : (i + 1) % ARTWORKS.length));
  }, []);

  /** Go to the previous artwork (wraps). */
  const goPrev = useCallback(() => {
    setSelectedIndex((i) => (i === null ? 0 : (i - 1 + ARTWORKS.length) % ARTWORKS.length));
  }, []);

  /**
   * Opens the modal for a carousel item.
   * @param {number} index - Index into {@link ARTWORKS}
   */
  const handleItemClick = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  return (
    <GlitchPageLayout fullWidth>
      <motion.header
        className="text-center"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          <span className="text-transparent bg-gradient-to-r from-orange-300 via-yellow-300 to-teal-300 bg-clip-text">
            Arts
          </span>
        </h1>

        <div className="relative mx-auto mt-4 flex min-h-[2.5rem] max-w-2xl justify-center px-2">
          <TextType
            text={['scroll · drag · click to expand', 'welcome to my art gallery', 'my leisure time hobby']}
            as="p"
            className="text-base font-medium text-center text-emerald-100 sm:text-lg"
            typingSpeed={70}
            pauseDuration={1800}
            deletingSpeed={45}
            showCursor
            cursorCharacter="_"
            cursorClassName="text-cyan-300"
            cursorBlinkDuration={0.5}
            textColors={['#61dca3', '#61b3dc', '#a7f3d0']}
          />
        </div>

        <p className="mt-2 text-gray-100 text-md">center an artwork and click to expand</p>
        <p className="text-gray-100 text-md">App: Procreate</p>
      </motion.header>

      <motion.div
        className="relative w-full mx-auto mt-8"
        style={{ height: 'min(68vh, 620px)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <CircularGallery
          items={carouselItems}
          bend={1}
          textColor="#e2e8f0"
          borderRadius={0.06}
          scrollSpeed={2}
          scrollEase={0.05}
          className="rounded-2xl"
          onItemClick={handleItemClick}
        />
      </motion.div>

      <AnimatePresence>
        {selectedArtwork && (
          <GalleryModal
            key={selectedArtwork.id}
            artwork={selectedArtwork}
            onClose={() => setSelectedIndex(null)}
            onNext={goNext}
            onPrev={goPrev}
          />
        )}
      </AnimatePresence>
    </GlitchPageLayout>
  );
}
