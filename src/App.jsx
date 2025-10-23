import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'

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
          </Routes>
        </main>
        
        {/* Footer component appears on all pages */}
        <Footer />
      </div>
    </Router>
  )
}

export default App

