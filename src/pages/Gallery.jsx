import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

/**
 * Gallery/Portfolio Page Component
 * 
 * Showcases completed projects and work samples
 * Contains:
 * - Filterable image gallery
 * - Lightbox view for images
 * - Project descriptions
 * - Category filtering
 */
function Gallery() {
  // State for lightbox (modal view for images)
  const [selectedImage, setSelectedImage] = useState(null)
  // State for category filter
  const [activeCategory, setActiveCategory] = useState('all')

  // Gallery categories
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'tables', name: 'Tables' },
    { id: 'chairs', name: 'Chairs & Seating' },
    { id: 'kitchen', name: 'Kitchen Units' },
    { id: 'installations', name: 'Installations' },
    { id: 'custom', name: 'Custom Work' },
  ]

  // Gallery items - This would typically come from a CMS or API
  // Each item represents a completed project with images
  const galleryItems = [
    {
      id: 1,
      title: 'Modern Coffee Table - Maple Wood',
      category: 'tables',
      description: 'Custom-designed coffee table with clean lines and natural maple finish.',
      image: '/images/gallery/coffee-table-1.jpg',
    },
    {
      id: 2,
      title: 'Rustic Study Desk',
      category: 'tables',
      description: 'Spacious study desk with built-in storage and cable management.',
      image: '/images/gallery/study-desk-1.jpg',
    },
    {
      id: 3,
      title: 'Dining Chair Set',
      category: 'chairs',
      description: 'Set of 6 matching dining chairs with comfortable upholstered seats.',
      image: '/images/gallery/dining-chairs-1.jpg',
    },
    {
      id: 4,
      title: 'Bar Stools',
      category: 'chairs',
      description: 'Contemporary bar stools with adjustable height and footrest.',
      image: '/images/gallery/bar-stools-1.jpg',
    },
    {
      id: 5,
      title: 'Complete Kitchen Installation',
      category: 'kitchen',
      description: 'Full kitchen unit with custom cabinets, countertop, and hardware.',
      image: '/images/gallery/kitchen-1.jpg',
    },
    {
      id: 6,
      title: 'Kitchen Cabinet System',
      category: 'kitchen',
      description: 'Wall-mounted kitchen cabinets with soft-close mechanism.',
      image: '/images/gallery/kitchen-2.jpg',
    },
    {
      id: 7,
      title: 'TV Stand with Storage',
      category: 'installations',
      description: 'Wall-mounted TV unit with integrated storage compartments.',
      image: '/images/gallery/tv-stand-1.jpg',
    },
    {
      id: 8,
      title: 'Wooden Wall Art',
      category: 'installations',
      description: 'Geometric wooden wall art installation for modern living room.',
      image: '/images/gallery/wall-art-1.jpg',
    },
    {
      id: 9,
      title: 'Custom Bookshelf',
      category: 'custom',
      description: 'Floor-to-ceiling bookshelf designed to fit specific wall dimensions.',
      image: '/images/gallery/bookshelf-1.jpg',
    },
    {
      id: 10,
      title: 'Entryway Bench with Storage',
      category: 'custom',
      description: 'Multi-functional bench with shoe storage and coat hooks.',
      image: '/images/gallery/bench-1.jpg',
    },
    {
      id: 11,
      title: 'Executive Office Desk',
      category: 'tables',
      description: 'Large executive desk with premium finish and built-in organizers.',
      image: '/images/gallery/office-desk-1.jpg',
    },
    {
      id: 12,
      title: 'Curtain Rod Installation',
      category: 'installations',
      description: 'Professional curtain rod mounting for bay windows.',
      image: '/images/gallery/curtain-rod-1.jpg',
    },
  ]

  // Filter gallery items based on active category
  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  // Open image in lightbox
  const openLightbox = (item) => {
    setSelectedImage(item)
  }

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null)
  }

  return (
    <div className="min-h-screen">
      
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-100 to-accent-cream section-padding">
        <div className="container-custom text-center">
          <h1 className="text-primary-900 mb-6 animate-fade-in">
            Our Gallery
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Browse through our portfolio of completed projects and see the quality of our craftsmanship
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

      {/* Gallery Grid */}
      <section className="section-padding bg-accent-cream">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="card group cursor-pointer animate-fade-in"
                onClick={() => openLightbox(item)}
              >
                {/* Image placeholder */}
                <div className="aspect-square bg-gradient-to-br from-primary-200 to-primary-500 overflow-hidden relative">
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center p-4">
                      <p className="font-semibold text-sm">{item.title}</p>
                    </div>
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                      Click to view
                    </span>
                  </div>
                </div>
                
                {/* Item info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-primary-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* No results message */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Stats */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary-300 mb-2">100+</p>
              <p className="text-primary-200">Projects Completed</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary-300 mb-2">50+</p>
              <p className="text-primary-200">Happy Clients</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary-300 mb-2">5+</p>
              <p className="text-primary-200">Years Experience</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary-300 mb-2">100%</p>
              <p className="text-primary-200">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-primary-900 mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Let's create something beautiful together. Contact us today to discuss your ideas.
          </p>
          <a href="/contact" className="btn-primary">
            Get in Touch
          </a>
        </div>
      </section>

      {/* Lightbox Modal for viewing images in full */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-primary-300 transition-colors"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <FaTimes />
          </button>
          
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Image placeholder in lightbox */}
            <div className="aspect-video bg-gradient-to-br from-primary-300 to-primary-600 rounded-lg overflow-hidden mb-4">
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center p-8">
                  <p className="text-2xl font-semibold mb-2">{selectedImage.title}</p>
                  <p className="text-sm opacity-90">Large image would display here</p>
                </div>
              </div>
            </div>
            
            {/* Image details */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-primary-800 mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-gray-700">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery

