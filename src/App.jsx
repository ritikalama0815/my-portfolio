import React, { Suspense, lazy } from 'react'
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom'
import SiteNav from './components/SiteNav';
import { Home, About, Projects, Contact } from './pages';

const Gallery = lazy(() => import('./pages/Gallery'));

const App = () => {
  return (
    <main className="h-full bg-slate-300/20">
      <Router>
        <SiteNav />
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center text-slate-600">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/fun" element={<Navigate to="/gallery" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </main>
  )
}

export default App
