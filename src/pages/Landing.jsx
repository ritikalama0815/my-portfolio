import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BOOT_LINES = [
  'ritika@portfolio:~$ ./boot.sh',
  'loading assets... ok',
  'loading 3d island... ok',
  'welcome to my portfolio',
];

const Landing = () => {
  const navigate = useNavigate();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return undefined;

    const currentLine = BOOT_LINES[lineIndex];
    if (charIndex < currentLine.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 28);
      return () => clearTimeout(t);
    }

    if (lineIndex < BOOT_LINES.length - 1) {
      const t = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 400);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setFinished(true), 500);
    return () => clearTimeout(t);
  }, [lineIndex, charIndex, finished]);

  const displayedLines = BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => {
    if (i < lineIndex) return line;
    return line.slice(0, charIndex);
  });

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black px-4 py-16">
      <motion.div
        className="w-full max-w-2xl rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-purple-900/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-xs text-slate-500">portfolio — bash</span>
        </div>

        <div className="space-y-1 p-6 font-mono text-sm leading-relaxed sm:text-base">
          {displayedLines.map((line, i) => (
            <p key={i} className="text-[#61dca3]">
              {line}
              {i === lineIndex && !finished && (
                <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-[#61dca3]" />
              )}
            </p>
          ))}

          {finished && (
            <motion.div
              className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-slate-400">
                <span className="text-[#61b3dc]">ritika@portfolio:~$</span> ready_
              </p>
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="rounded-lg border border-[#61dca3]/40 bg-[#61dca3]/10 px-6 py-2.5 text-sm font-semibold text-[#61dca3] transition hover:bg-[#61dca3]/20 hover:shadow-lg hover:shadow-[#61dca3]/10 active:scale-95"
              >
                Start →
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;
