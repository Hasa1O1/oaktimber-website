import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaSignOutAlt, FaTimes } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import useAdminMode from '../../hooks/useAdminMode'

/**
 * Header component with navigation menu
 * 
 * Features:
 * - Responsive navigation that collapses on mobile devices
 * - Sticky header that stays at top when scrolling
 * - Active page highlighting
 * - Mobile menu toggle
 */
function Header() {
  // State to control mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // State to track scroll position for header styling
  const [isScrolled, setIsScrolled] = useState(false)
  // Get current location to highlight active page
  const location = useLocation()
  const { isAdmin, supabase } = useAdminMode()

  // Navigation menu items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products & Services', path: '/products' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ]
  const getIsActive = (path) => location.pathname === path

  const handleLogout = async () => {
    if (!supabase) return

    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error(error.message)
      return
    }
    toast.success('Logged out')
  }

  // Handle scroll effect - change header style when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <nav className="container-custom px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/images/logo image.png" 
              alt="Oaktimber Logo" 
              className="w-12 h-12 rounded-lg transform group-hover:rotate-6 transition-transform duration-300"
            />
            <div>
              <h1 className="text-2xl font-bold text-wood-dark tracking-tight">
                OAKTIMBER
              </h1>
              <p className="text-xs text-primary-600 font-medium">
                Quality Craftsmanship
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors duration-200 hover:text-primary-600 ${
                  getIsActive(item.path)
                    ? 'text-primary-600 border-b-2 border-accent-orange pb-1'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/contact" className="btn-primary">
              Get a Quote
            </Link>
            {isAdmin && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-red-700"
              >
                <FaSignOutAlt />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-primary-700 text-2xl p-2 hover:bg-primary-50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    getIsActive(item.path)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-primary-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/contact" className="btn-primary mx-4">
                Get a Quote
              </Link>
              {isAdmin && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mx-4 inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-red-700"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

