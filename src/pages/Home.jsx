import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

/**
 * Home Page Component
 * 
 * This is the landing page that visitors see first.
 * Contains:
 * - Hero section with main tagline and call-to-action
 * - Business summary and value propositions
 * - Featured products preview
 * - Why choose us section
 * - Call to action section
 */
function Home() {
  // State to track which hero image is currently displayed (0, 1, or 2)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // State to track current image for each product card
  const [productImageIndices, setProductImageIndices] = useState({})

  // Effect to rotate through hero images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Function to navigate product images
  const navigateProductImage = (productId, direction) => {
    setProductImageIndices(prev => {
      const currentIndex = prev[productId] || 0
      const product = featuredProducts.find(p => p.id === productId)
      const maxIndex = product.images.length - 1
      
      let newIndex
      if (direction === 'next') {
        newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1
      } else {
        newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1
      }
      
      return { ...prev, [productId]: newIndex }
    })
  }

  // Featured products data for display on home page
  const featuredProducts = [
    {
      id: 1,
      name: 'TV Stands',
      description: 'Wall-mounted and floor-standing TV units with integrated storage solutions.',
      images: ['/images/TV Stand.png'],
    },
    {
      id: 2,
      name: 'Book Shelves',
      description: 'Custom-built shelves and storage solutions designed to maximize your space.',
      images: ['/images/Book Shelves 1.png', '/images/Book Shelves 2.png'],
    },
    {
      id: 3,
      name: 'Wardrobe Installation',
      description: 'Complete wardrobe systems and closet installations tailored to your needs.',
      images: ['/images/Waderope installation.png'],
    },
  ]

  // Reasons to choose OAKTIMBER
  const benefits = [
    'Premium quality materials (Maple wood, MDF, Compressed boards)',
    'Skilled craftsmanship with attention to detail',
    'Custom designs tailored to your space',
    'Professional installation services',
    'Competitive pricing',
    'Timely project completion',
  ]

  return (
    <div className="min-h-screen">
      
      {/* Hero Section - First thing visitors see */}
      <section className="relative bg-gradient-to-br from-primary-50 via-accent-cream to-primary-100 section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left side - Text content */}
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-primary-900 leading-tight">
                Crafting Timeless
                <span className="block text-primary-600">Wooden Masterpieces</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Transform your space with handcrafted furniture and custom installations. 
                From elegant coffee tables to complete kitchen units, we bring your vision to life 
                with premium materials and expert craftsmanship.
              </p>
              
              {/* Call to action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/contact" className="btn-primary inline-flex items-center justify-center gap-2">
                  Get a Free Quote
                  <FaArrowRight className="text-sm" />
                </Link>
                <Link to="/gallery" className="btn-secondary inline-flex items-center justify-center">
                  View Our Work
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 pt-6 border-t border-primary-200">
                <div>
                  <p className="text-3xl font-bold text-primary-700">100+</p>
                  <p className="text-sm text-gray-600">Projects Completed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary-700">50+</p>
                  <p className="text-sm text-gray-600">Happy Clients</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary-700">5★</p>
                  <p className="text-sm text-gray-600">Customer Rating</p>
                </div>
              </div>
            </div>

            {/* Right side - Rotating Hero Cards */}
            <div className="relative animate-slide-in-right h-96">
              {/* Card 3 - Back card, shows corner only */}
              <div className={`absolute inset-0 rounded-2xl shadow-lg overflow-hidden transform -rotate-6 translate-y-4 translate-x-4 z-0 transition-opacity duration-700 ${currentImageIndex === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <img 
                  src="/images/hero image 3.png" 
                  alt="OAKTIMBER craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Card 2 - Middle card, shows corner only */}
              <div className={`absolute inset-0 rounded-2xl shadow-xl overflow-hidden transform rotate-3 translate-y-2 translate-x-2 z-10 transition-opacity duration-700 ${currentImageIndex === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <img 
                  src="/images/hero image 2.png" 
                  alt="OAKTIMBER furniture"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Card 1 - Front card, fully visible */}
              <div className={`absolute inset-0 rounded-2xl shadow-2xl overflow-hidden z-20 transition-opacity duration-700 ${currentImageIndex === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <img 
                  src="/images/hero image 1.jpg" 
                  alt="OAKTIMBER - Handcrafted wooden furniture and custom installations"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-600 rounded-2xl opacity-20 -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-400 rounded-full opacity-20 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Summary Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-primary-900 animate-slide-up">
              Welcome to OAKTIMBER
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We are a dedicated carpentry workshop specializing in the design and manufacture 
              of premium wooden furniture and custom installations. Every piece we create is 
              crafted with precision, passion, and a commitment to quality that stands the test of time.
            </p>
            <Link to="/about" className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 gap-2">
              Learn More About Us
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-primary-900 mb-4">Featured Products & Services</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Explore our range of handcrafted furniture and professional installation services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              const currentImageIndex = productImageIndices[product.id] || 0
              const currentImage = product.images[currentImageIndex]
              const hasMultipleImages = product.images.length > 1
              
              return (
                <div key={product.id} className="card group">
                  {/* Product image carousel */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <img 
                      src={currentImage} 
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Navigation arrows for multiple images */}
                    {hasMultipleImages && (
                      <>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            navigateProductImage(product.id, 'prev')
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          aria-label="Previous image"
                        >
                          <FaChevronLeft className="text-sm" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            navigateProductImage(product.id, 'next')
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          aria-label="Next image"
                        >
                          <FaChevronRight className="text-sm" />
                        </button>
                        
                        {/* Image indicators */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                          {product.images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Product details */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-primary-800 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">
                      {product.description}
                    </p>
                    <Link 
                      to="/products" 
                      className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 gap-2"
                    >
                      Learn More
                      <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              View All Products & Services
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left side - Why Choose Us Image */}
            <div className="relative">
              <img 
                src="/images/why choose us image..jpg" 
                alt="OAKTIMBER workshop and craftsmanship"
                className="w-full aspect-square object-cover rounded-2xl shadow-xl"
              />
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-400 rounded-2xl opacity-20 -z-10"></div>
            </div>

            {/* Right side - Benefits list */}
            <div className="space-y-6">
              <h2 className="text-primary-900">
                Why Choose OAKTIMBER?
              </h2>
              <p className="text-gray-700 text-lg">
                We combine traditional craftsmanship with modern design to deliver furniture 
                that's built to last and beautiful to behold.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                        <FaCheck className="text-white text-xs" />
                      </div>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Let's bring your vision to life with custom furniture and professional installations. 
            Get in touch today for a free consultation and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
            >
              Contact Us Now
              <FaArrowRight />
            </Link>
            <Link 
              to="/gallery" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-700 transition-all duration-300 inline-flex items-center justify-center"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

