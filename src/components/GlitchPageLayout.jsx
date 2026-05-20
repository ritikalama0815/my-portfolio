import LetterGlitch from './LetterGlitch';

const GLITCH_PROPS = {
  glitchSpeed: 50,
  centerVignette: true,
  outerVignette: false,
  smooth: true,
  colors: ['#2b4539', '#61dca3', '#61b3dc'],
};

export default function GlitchPageLayout({
  children,
  className = '',
  panelClassName = '',
  fullWidth = false,
}) {
  return (
    <div className={`glitch-page relative min-h-screen overflow-x-hidden ${className}`}>
      <div className="fixed inset-0 z-0" aria-hidden>
        <LetterGlitch {...GLITCH_PROPS} showCenterVignette showOuterVignette={false} />
      </div>

      <div
        className={`relative z-10 mx-auto px-4 pb-16 pt-28 sm:px-8 sm:pt-32 ${
          fullWidth ? 'max-w-[1600px]' : 'max-w-5xl'
        }`}
      >
        <div
          className={`rounded-3xl border border-white/10 bg-slate-950/82 shadow-2xl shadow-black/40 backdrop-blur-xl ${panelClassName}`}
        >
          <div className="px-5 py-8 sm:px-10 sm:py-12">{children}</div>
        </div>
      </div>
    </div>
  );
}
