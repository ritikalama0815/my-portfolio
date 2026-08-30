import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import CircularGallery from '../components/CircularGallery';
import TextType from '../components/TextType';
import GlitchPageLayout from '../components/GlitchPageLayout';
import PixelSnow from '../components/PixelSnow';
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
  room,
  blueberry,
  scaramouche,
  nahihi,
  flins,
  kagura
} from '../assets/images';

const ARTWORKS = [
  {
    id: 1,
    title: 'Ai',
    image: ai,
    text: 'Ai',
    description:
      'Ai Hoshino was the lead idol of the original B-Komachi and mother of Aqua and Ruby. As an idol, she lived a life of deceit by pretending to genuinely love her fans.',
    year: '2025',
    artist: 'Ritika Lama',
  },
  { id: 2, title: 'Columbina', image: columbina, text: 'Columbina', description: '3rd of Fatui Harbingers', year: '2026', artist: 'Ritika Lama' },
  { id: 3, title: 'Cat', image: cat, text: 'Cat', description: 'sleeping', year: '2025', artist: 'Ritika Lama' },
  { id: 4, title: 'Venti', image: venti, text: 'Venti', description: 'He is a free-spirited bard.', year: '2026', artist: 'Ritika Lama' },
  { id: 5, title: 'Forest', image: forest, text: 'Forest', description: 'Warm yet cold camp site', year: '2025', artist: 'Ritika Lama' },
  {
    id: 6,
    title: 'Illumi',
    image: illumi,
    text: 'Illumi',
    description:
      'Illumi Zoldyck is an elite professional assassin and the eldest child of Silva and Kikyo Zoldyck.',
    year: '2025',
    artist: 'Ritika Lama',
  },
  { id: 7, title: 'Arlecchino', image: father, text: 'Arlecchino', description: '4th of Fatui Harbingers', year: '2025', artist: 'Ritika Lama' },
  {
    id: 8,
    title: 'Mao Mao',
    image: maomao,
    text: 'Mao Mao',
    description:
      'Maomao is the protagonist of The Apothecary Diaries series. She is an illegitimate member of the La Clan raised in the red-light district.',
    year: '2025',
    artist: 'Ritika Lama',
  },
  {
    id: 9,
    title: 'Flowery Room',
    image: room,
    text: 'Flowery Room',
    description: 'Flowery room perfect for wedding scenarios.',
    year: '2025',
    artist: 'Ritika Lama',
  },
  {
    id: 10,
    title: 'Blueberry',
    image: blueberry,
    text: 'Blueberry',
    description: 'Why is blueberry called blueberry but strawberry not called redberry?',
    year: '2025',
    artist: 'Ritika Lama',
  },
  {
    id: 11,
    title: 'Scaramouche',
    image: scaramouche,
    text: 'Scaramouche',
    description:
      'A story of character from Genshin Impact portrayed as art. Scaramouche was used by an evil Doctor to perform various experimentations on him.',
    year: '2025',
    artist: 'Ritika Lama',
  },
  { id: 12, title: 'Nahihi', image: nahihi, text: 'Nahihi', description: 'character portrait study.', year: '2026', artist: 'Ritika Lama' },
  { id: 13, title: 'Flins', image: flins, text: 'Flins', description: 'a fae in charge of cemetry', year: '2026', artist: 'Ritika Lama' },
  { id: 14, title: 'Kagura', image: kagura, text: 'Frieren', description: 'strongest female lead', year: '2026', artist: 'Ritika Lama' },
  { id: 15, title: 'girl', image: girl, text: 'girl', description: 'girl', year: '2026', artist: 'ritika' },
  { id: 16, title: 'Columbina and Sandrone', image: sandbina, text: 'Columbina and Sandrone', description: 'Columbina and Sandrone', year: '2026', artist: 'ritika' },
];

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
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" aria-hidden />

      <motion.button
        type="button"
        className="absolute z-20 p-3 text-white transition -translate-y-1/2 rounded-full left-2 sm:left-6 top-1/2 bg-white/10 ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/20"
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
        className="absolute z-20 p-3 text-white transition -translate-y-1/2 rounded-full right-2 sm:right-6 top-1/2 bg-white/10 ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/20"
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

      <motion.article
        className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15"
        initial={{ opacity: 0, y: 32, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-black">
          <PixelSnow
            color="#ffffff"
            flakeSize={0.01}
            minFlakeSize={1.25}
            pixelResolution={200}
            speed={1.25}
            density={0.3}
            direction={125}
            brightness={1}
            depthFade={8}
            farPlane={20}
            gamma={0.4545}
            variant="square"
          />
          <div className="absolute inset-0 bg-black/45" aria-hidden />
        </div>

        <motion.button
          type="button"
          className="absolute top-4 right-4 z-20 rounded-full bg-white/10 p-2 text-white ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-white/20"
          onClick={onClose}
          whileHover={{ scale: 1.08, rotate: 90 }}
          aria-label="Close"
        >
          <X size={22} />
        </motion.button>

        <div className="relative z-10 flex max-h-[92vh] flex-col items-center overflow-y-auto px-6 py-8 text-center sm:px-10 sm:py-10">
          <div className="relative flex min-h-[min(52vh,480px)] w-full max-w-xl items-center justify-center">
            {imageLoading && (
              <div
                className="flex h-[min(52vh,480px)] w-full max-w-md flex-col items-center justify-center gap-4 rounded-sm bg-slate-900/70 px-6"
                aria-live="polite"
                aria-busy="true"
              >
                <div className="gallery-skeleton relative h-[min(36vh,320px)] w-full max-w-sm overflow-hidden rounded-sm bg-slate-800/90">
                  <div className="gallery-skeleton-shimmer absolute inset-0" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-14 w-14 animate-spin rounded-full border-2 border-slate-600 border-t-emerald-400" />
                  </div>
                </div>

                <div className="w-full max-w-xs space-y-2">
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
            )}

            {imageSrc && !imageLoading && (
              <motion.img
                key={imageSrc}
                src={imageSrc}
                alt={artwork.title}
                className="max-h-[min(52vh,480px)] w-auto max-w-full rounded-sm border-2 border-white object-contain drop-shadow-2xl"
                decoding="async"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>

          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {artwork.title} ({artwork.year})
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
            {artwork.description}
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
}

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

  const goNext = useCallback(() => {
    setSelectedIndex((i) => (i === null ? 0 : (i + 1) % ARTWORKS.length));
  }, []);

  const goPrev = useCallback(() => {
    setSelectedIndex((i) => (i === null ? 0 : (i - 1 + ARTWORKS.length) % ARTWORKS.length));
  }, []);

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
          <span className="text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text">
            Arts
          </span>
        </h1>

        <div className="relative mx-auto mt-4 flex min-h-[2.5rem] max-w-2xl justify-center px-2">
          <TextType
            text={['scroll · drag · click to expand', 'welcome to my art gallery']}
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

        <p className="mt-2 text-sm text-slate-400">center an artwork and click to expand</p>
        <p className="text-sm text-slate-500">This is what I do outside of coding and Comp Sci stuff.</p>
        <p className="text-sm text-slate-500">App: Procreate</p>
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
