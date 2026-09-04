import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import { Home, About, Projects, Contact } from './pages';

/** Lazy-loaded arts gallery (heavier ogl bundle). */
const Gallery = lazy(() => import('./pages/Gallery'));

/**
 * Root app: React Router shell, global BubbleMenu navbar, and page routes.
 * Gallery is code-split; other pages load eagerly.
 *
 * @returns {JSX.Element}
 */
const App = () => (
  <main className="h-full">
    <Router>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center bg-black text-slate-300">
            Loading…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </Suspense>
    </Router>
  </main>
);

export default App;
