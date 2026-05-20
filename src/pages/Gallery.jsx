import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import CircularGallery from '../components/CircularGallery';
import TextType from '../components/TextType';
import {ai, flins, nahihi, mavuika, frieren, columbina, venti, cat, makima, evangelion, forest, father, illumi, maomao, wall, room, blueberry, scaramouche} from "../assets/images";

const ARTWORKS = [
  { id: 1, title: "Ai Hoshino", image: ai, description: "As an idol, she lived a life of deceit by pretending to genuinely love her fans. ", year: "2025", artist: "Ritika Lama" }, 
    { id: 2, title: "Columbina", image: columbina, description: "3rd of Fatui Harbingers", year: "2026", artist: "Ritika Lama"},
    { id: 3, title: "Cat", image: cat, description: "sleeping", year: "2025", artist: "Ritika Lama"},
    { id: 4, title: "Venti", image: venti, description: "He is a free-spirited bard.", year: "2026", artist: "Ritika Lama"},
        { id: 5, title: "Kaworu Nagisa", image: evangelion, description: "Kaworu Nagisa, the Fifth Child and seventeenth Angel. ", year: "2025", artist: "Ritika Lama" }, 
        { id: 6, title: "Forest", image: forest, description: "Cold yet warm camp site", year: "2025", artist: "Ritika Lama"},
        { id: 7, title: "Makima", image: makima, description: "The Chief Cabinet Secretary's Personal Devil Hunter", year: "2026", artist: "Ritika Lama"},
        { id: 8, title: "Illumi", image: illumi,
           description: "Illumi Zoldyck (イルミ＝ゾルディック) is an elite professional assassin and the eldest child of Silva and Kikyo Zoldyck. ",
            year: "2025", artist: "Ritika Lama"},
     { id: 9, title: "Arlecchino", image: father, description: "4th of Fatui Harbingers ", year: "2025", artist: "Ritika Lama" }, 
     { id: 11, title: "Mao Mao", image: maomao, description: "Maomao (猫猫) is a member of the La Clan raised in the red-light district.", year: "2025", artist: "Ritika Lama"},
     { id: 12, title: "Wall", image: wall,
          description: "Beyond the wall lies a world unknown.",
          year: "2025", artist: "Ritika Lama"},
    { id: 13, title: "Flowery Room", image: room, description: "Flowery room perfect for wedding scenarios.", year: "2025", artist: "Ritika Lama"},
    { id: 14, title: "Blueberry", image: blueberry, description: "Why is blueberry called blueberry but strawberry not called redberry?", year: "2025", artist: "Ritika Lama" },
    { id: 15, title: "Scaramouche", image: scaramouche, 
      description: "A story of Scaramouche who was used by a Doctor to perform various experimentations on him.", 
      year: "2025", artist: "Ritika Lama"},
      { id: 16, title: "Flins", image: flins, 
        description: "A Snowland Fae acting as the guardian of the Final Night Cemetery.", 
        year: "2026", artist: "Ritika Lama"},
        { id: 17, title: "Mavuika", image: mavuika, 
          description: "Also known by the ancient name Kiongozi and the Goetic name Haborym.", 
          year: "2026", artist: "Ritika Lama"},
          { id: 18, title: "Nahida", image: nahihi, 
            description: "Fragment(?) of Greater Lord Rukkhadevata", 
            year: "2026", artist: "Ritika Lama"},
            { id: 19, title: "Frieren", image: frieren, 
              description: "A very strong elf mage", 
              year: "2026", artist: "Ritika Lama"},
];

function GalleryModal({ artwork, onClose, onPrev, onNext }) {
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

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-md" />

      <motion.button
        type="button"
        className="absolute z-10 p-3 text-white transition -translate-y-1/2 rounded-full left-2 sm:left-6 top-1/2 bg-white/10 ring-1 ring-white/20 backdrop-blur-md hover:bg-white/25 hover:scale-105"
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
        className="absolute z-10 p-3 text-white transition -translate-y-1/2 rounded-full right-2 sm:right-6 top-1/2 bg-white/10 ring-1 ring-white/20 backdrop-blur-md hover:bg-white/25"
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
        className="relative z-10 flex w-full max-w-5xl max-h-[92vh] flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50 to-violet-50 shadow-2xl ring-1 ring-white/60 md:flex-row"
        initial={{ opacity: 0, y: 32, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          type="button"
          className="absolute z-20 p-2 text-white transition rounded-full top-4 right-4 bg-slate-900/60 backdrop-blur-sm hover:bg-slate-900"
          onClick={onClose}
          whileHover={{ scale: 1.08, rotate: 90 }}
          aria-label="Close"
        >
          <X size={20} />
        </motion.button>

        <motion.div
          className="relative flex-1 min-h-[240px] bg-gradient-to-br from-violet-200/40 via-fuchsia-100/30 to-sky-100/40 md:min-h-0"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 }}
        >
          <img
            src={artwork.image}
            alt={artwork.title}
            className="h-full w-full max-h-[55vh] object-contain p-4 md:max-h-none"
            decoding="async"
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-violet-900/10 via-transparent to-transparent" />
        </motion.div>

        <div className="flex flex-col justify-between flex-1 gap-4 p-6 sm:p-8 md:max-w-sm">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase rounded-full bg-violet-100 text-violet-700"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {artwork.year}
            </motion.div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{artwork.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{artwork.description}</p>
          </div>

          <div className="p-4 border shadow-sm rounded-xl border-violet-100 bg-white/80 backdrop-blur-sm">
            <p className="text-xs font-medium tracking-wide uppercase text-violet-500">Artist</p>
            <p className="mt-1 font-semibold text-slate-800">{artwork.artist}</p>
          </div>
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
    <motion.div
      className="relative min-h-screen pt-20 overflow-x-hidden bg-gradient-to-b from-slate-100 via-violet-50/40 to-slate-200 pb-14"
    >
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-violet-400/20 blur-3xl"
        aria-hidden
      />

      <header className="relative z-10 max-w-6xl px-4 mx-auto text-center">
        <motion.h1
          className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-700 via-fuchsia-600 to-indigo-600 sm:text-5xl"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          arts
        </motion.h1>

        <div className="relative mx-auto mt-4 flex min-h-[2.5rem] max-w-2xl items-center justify-center px-2">
          <TextType
            as="p"
            text={[
              'i like to draw (kinda)',
              'scroll · click to expand',
              "my art gallery"
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            deletingSpeed={50}
            showCursor
            cursorCharacter="_"
            cursorBlinkDuration={0.5}
            className="text-base font-medium sm:text-lg md:text-xl"
            textColors={['#6d28d9', '#a21caf', '#4f46e5']}
          />
        </div>
      </header>

      <motion.div
        className="relative z-0 w-full max-w-6xl px-4 mx-auto mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div
          className="relative p-1 overflow-hidden shadow-xl rounded-3xl bg-gradient-to-br from-slate-900/5 via-white/40 to-violet-200/30 ring-1 ring-violet-200/60"
          style={{ height: 'min(68vh, 620px)' }}
        >
          <CircularGallery
            items={carouselItems}
            bend={1}
            textColor="#312e81"
            borderRadius={0.06}
            scrollSpeed={2}
            scrollEase={0.05}
            className="rounded-[1.35rem] bg-slate-900/5"
            onItemClick={handleItemClick}
          />
        </div>
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
    </motion.div>
  );
}
