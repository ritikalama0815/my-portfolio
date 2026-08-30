import GradientWaves from './GradientWaves';

const WAVE_PROPS = {
  horizonColor: '#5227FF',
  waveColor: '#FF9FFC',
  crestColor: '#FFFFFF',
  speed: 0.4,
  amplitude: 2.5,
  waveScale: 0.6,
  waveRatio: 0.9,
  swell: 35,
  turbulence: 20,
  tilt: 1.11,
  zoom: 1.0,
  height: 5.5,
  fogDepth: 15,
  detail: 'medium',
  brightness: 1.0,
  opacity: 1.0,
  mouseInteraction: true,
  parallaxStrength: 0.5,
  grain: true,
  grainIntensity: 0.05,
};

export default function GlitchPageLayout({ children, className = '', fullWidth = false }) {
  return (
    <div className={`wave-page relative min-h-screen overflow-x-hidden ${className}`}>
      <div className="fixed inset-0 z-0 bg-black" aria-hidden>
        <GradientWaves {...WAVE_PROPS} />
      </div>

      <div
        className={`relative z-10 mx-auto px-4 pb-16 pt-28 sm:px-8 sm:pt-32 ${
          fullWidth ? 'max-w-[1600px]' : 'max-w-5xl'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
