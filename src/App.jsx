import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import { Home, About, Projects, Contact } from './pages';

const Gallery = lazy(() => import('./pages/Gallery'));

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
          <Route path="/fun" element={<Navigate to="/gallery" replace />} />
        </Routes>
      </Suspense>
    </Router>
  </main>
);

export default App;
