import { Link } from 'react-router-dom';
import { ExternalLink, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { projects } from '../constants';
import IC from '../components/IC';
import GlitchPageLayout from '../components/GlitchPageLayout';

const themeAccent = {
  'btn-back-yellow': 'from-amber-400/20 to-amber-600/10 ring-amber-400/30',
  'btn-back-red': 'from-rose-400/20 to-rose-600/10 ring-rose-400/30',
  'btn-back-blue': 'from-sky-400/20 to-sky-600/10 ring-sky-400/30',
  'btn-back-green': 'from-emerald-400/20 to-emerald-600/10 ring-emerald-400/30',
  'btn-back-pink': 'from-fuchsia-400/20 to-fuchsia-600/10 ring-fuchsia-400/30',
  'btn-back-black': 'from-slate-400/20 to-slate-600/10 ring-slate-400/30',
  'btn-back-orange': 'from-orange-400/20 to-orange-600/10 ring-orange-400/30',
};

const Projects = () => (
  <GlitchPageLayout panelClassName="border-emerald-500/20">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="flex flex-col gap-4 mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white sm:text-5xl">
            Projects & Research
          </h1>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
          I did various projects in different domains like machine learning, full stack development, and data science.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => {
          const accent = themeAccent[project.theme] ?? themeAccent['btn-back-blue'];
          const hasLink = Boolean(project.link?.trim());

          return (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${accent} p-[1px] ring-1 backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-emerald-500/10`}
            >
              <div className="flex flex-col h-full p-5 rounded-2xl bg-slate-900/90 sm:p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center justify-center transition h-14 w-14 shrink-0 rounded-xl bg-white/10 ring-1 ring-white/15 backdrop-blur-md group-hover:scale-105">
                    <img
                      src={project.iconUrl}
                      alt=""
                      className="object-contain w-8 h-8"
                    />
                  </div>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-400 ring-1 ring-white/10">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white sm:text-xl">{project.name}</h3>
                <p className="flex-1 mt-2 text-sm leading-relaxed text-slate-300">{project.description}</p>

                <div className="pt-4 mt-5 border-t border-white/10">
                  {hasLink ? (
                    <Link
                      to={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold transition text-emerald-300 hover:text-emerald-200"
                    >
                      View project
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="text-sm text-slate-500">Link coming soon</span>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <hr className="my-12 border-white/10" />
      <div className="text-slate-200 [&_a]:text-emerald-300 [&_p]:text-slate-300">
        <IC />
      </div>
    </motion.div>
  </GlitchPageLayout>
);

export default Projects;
