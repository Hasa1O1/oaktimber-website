import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import AdminLogin from './pages/AdminLogin'

/**
 * Main App component that handles routing and layout structure
 * 
 * This component wraps the entire application and provides:
 * - React Router for page navigation
 * - Consistent Header and Footer across all pages
 * - Route definitions for all pages
 */
function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      {/* Scroll to top on route change */}
      <ScrollToTop />
      
      <div className="flex flex-col min-h-screen">
        {/* Header component appears on all pages */}
        <Header />
        
        {/* Main content area - grows to fill available space */}
        <main className="flex-grow">
          <Routes>
            {/* Define all page routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/preview"
              element={(
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/admin/preview/about"
              element={(
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/admin/preview/products"
              element={(
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/admin/preview/gallery"
              element={(
                <ProtectedRoute>
                  <Gallery />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/admin/preview/contact"
              element={(
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              )}
            />
          </Routes>
        </main>
        
        {/* Footer component appears on all pages */}
        <Footer />
      </div>
    </Router>
  )
}

export default App

