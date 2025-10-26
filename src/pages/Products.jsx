import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

/**
 * Products & Services Page Component
 * 
 * Displays all products and services offered by OAKTIMBER
 * Contains:
 * - Product categories and gallery
 * - Service descriptions
 * - Filterable product display
 * - Request quote section
 */
function Products() {
  // State to track active category filter
  const [activeCategory, setActiveCategory] = useState('all')

  // Product categories for filtering
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'installations', name: 'Installations' },
    { id: 'services', name: 'Services' },
  ]

  // Products and services data
  const products = [
    {
      id: 1,
      name: 'Coffee Tables',
      category: 'furniture',
      description: 'Handcrafted coffee tables in various sizes and styles. Perfect centerpiece for your living room.',
      features: ['Custom sizes available', 'Multiple wood finishes', 'Durable construction', 'Modern & classic designs'],
      image: '/images/coffee-table.jpg',
    },
    {
      id: 2,
      name: 'Study Tables',
      category: 'furniture',
      description: 'Functional and elegant study desks designed for comfort and productivity.',
      features: ['Ergonomic design', 'Built-in storage options', 'Cable management', 'Customizable dimensions'],
      image: '/images/study-table.jpg',
    },
    {
      id: 3,
      name: 'Chairs & Stools',
      category: 'furniture',
      description: 'Comfortable seating solutions from dining chairs to bar stools.',
      features: ['Comfortable seating', 'Sturdy construction', 'Various styles', 'Custom upholstery available'],
      image: '/images/chairs.jpg',
    },
    {
      id: 4,
      name: 'Benches',
      category: 'furniture',
      description: 'Versatile benches for indoor and outdoor use, combining style with functionality.',
      features: ['Indoor & outdoor options', 'Custom lengths', 'Storage bench options', 'Weather-resistant finishes'],
      image: '/images/benches.jpg',
    },
    {
      id: 5,
      name: 'Kitchen Units',
      category: 'installations',
      description: 'Complete kitchen cabinet systems designed and installed to maximize your space.',
      features: ['Custom design', 'Quality hardware', 'Professional installation', 'Durable finishes'],
      image: '/images/kitchen-units.jpg',
    },
    {
      id: 6,
      name: 'TV Stands',
      category: 'installations',
      description: 'Wall-mounted and floor-standing TV units with integrated storage solutions.',
      features: ['Cable management', 'Storage compartments', 'Wall mounting available', 'Custom sizing'],
      image: '/images/TV Stand.png',
      price: 'K2,500',
    },
    {
      id: 7,
      name: 'Curtain Rod Installation',
      category: 'services',
      description: 'Professional installation of curtain rods and window treatment hardware.',
      features: ['Precise measurements', 'Secure mounting', 'All window types', 'Hardware included'],
      image: '/images/curtain-rods.jpg',
    },
    {
      id: 8,
      name: 'Wall Art Pieces',
      category: 'installations',
      description: 'Custom wooden wall art and decorative installations to enhance your space.',
      features: ['Custom designs', 'Unique pieces', 'Professional mounting', 'Various sizes'],
      image: '/images/wall-art.jpg',
    },
    {
      id: 9,
      name: 'Shelves',
      category: 'installations',
      description: 'Custom-built shelves and storage solutions designed to maximize your space.',
      features: ['Custom sizing', 'Various materials', 'Wall-mounted or freestanding', 'Professional installation'],
      image: '/images/Shelves.png',
    },
    {
      id: 10,
      name: 'Wardrobe Installation',
      category: 'installations',
      description: 'Complete wardrobe systems and closet installations tailored to your needs.',
      features: ['Custom design', 'Space optimization', 'Professional installation', 'Multiple storage options'],
      image: '/images/Waderope installation.png',
    },
    {
      id: 11,
      name: 'Drilling Services',
      category: 'services',
      description: 'Professional drilling and mounting services for all your installation needs.',
      features: ['All surface types', 'Precise drilling', 'Clean work', 'Quick service'],
      image: '/images/drilling.jpg',
    },
  ]

  // Filter products based on active category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory)

  return (
    <div className="min-h-screen">
      
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-100 to-accent-cream section-padding">
        <div className="container-custom text-center">
          <h1 className="text-primary-900 mb-6 animate-fade-in">
            Products & Services
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover our range of handcrafted furniture and professional installation services
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white py-8 sticky top-20 z-40 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-accent-cream">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="card animate-fade-in">
                {/* Product image */}
                {product.image ? (
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm opacity-90 mt-1">Product Image</p>
                    </div>
                  </div>
                )}
                
                {/* Product details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-primary-800">
                      {product.name}
                    </h3>
                    {product.price && (
                      <span className="text-xl font-bold text-primary-600">
                        {product.price}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">
                    {product.description}
                  </p>
                  
                  {/* Features list */}
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="mt-1 flex-shrink-0">
                          <div className="w-4 h-4 rounded-full bg-primary-100 flex items-center justify-center">
                            <FaCheck className="text-primary-600 text-xs" />
                          </div>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* No results message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-primary-900 mb-4">Additional Services</h2>
              <p className="text-lg text-gray-700">
                Beyond our standard offerings, we provide comprehensive carpentry solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-primary-50 rounded-lg p-6 space-y-3">
                <h3 className="text-xl font-semibold text-primary-800">Custom Design</h3>
                <p className="text-gray-700">
                  Have a unique vision? We specialize in custom furniture design tailored to your 
                  specific requirements, space, and style preferences. From initial sketch to final installation, 
                  we work closely with you every step of the way.
                </p>
              </div>

              <div className="bg-primary-50 rounded-lg p-6 space-y-3">
                <h3 className="text-xl font-semibold text-primary-800">Consultation</h3>
                <p className="text-gray-700">
                  Not sure what you need? Schedule a free consultation where we'll assess your space, 
                  discuss your needs, and provide expert recommendations. We'll help you choose the right 
                  materials, styles, and solutions for your project.
                </p>
              </div>

              <div className="bg-primary-50 rounded-lg p-6 space-y-3">
                <h3 className="text-xl font-semibold text-primary-800">Repair & Refinishing</h3>
                <p className="text-gray-700">
                  Already have furniture that needs some love? We offer repair and refinishing services 
                  to restore your wooden furniture to its former glory. From structural repairs to 
                  complete refinishing, we can help.
                </p>
              </div>

              <div className="bg-primary-50 rounded-lg p-6 space-y-3">
                <h3 className="text-xl font-semibold text-primary-800">Commercial Projects</h3>
                <p className="text-gray-700">
                  We work with businesses too! Whether you need office furniture, restaurant seating, 
                  or retail fixtures, we can handle commercial projects of various scales with the same 
                  attention to quality and detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Information */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-white mb-4">Quality Materials</h2>
            <p className="text-primary-200 text-lg">
              All our products are crafted using premium materials including:
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <span className="px-6 py-3 bg-primary-800 rounded-full text-primary-100 font-medium">
                Maple Wood
              </span>
              <span className="px-6 py-3 bg-primary-800 rounded-full text-primary-100 font-medium">
                MDF Boards
              </span>
              <span className="px-6 py-3 bg-primary-800 rounded-full text-primary-100 font-medium">
                Compressed Wood
              </span>
              <span className="px-6 py-3 bg-primary-800 rounded-full text-primary-100 font-medium">
                Quality Hardware
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Request Quote CTA */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-6">
            Interested in Our Products or Services?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. We'll help you find the perfect 
            solution for your needs.
          </p>
          <a href="/contact" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
            Request a Quote
          </a>
        </div>
      </section>
    </div>
  )
}

export default Products

