import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaCheck, FaStar } from 'react-icons/fa'

/**
 * Home Page Component
 * 
 * This is the landing page that visitors see first.
 * Contains:
 * - Hero section with main tagline and call-to-action
 * - Business summary and value propositions
 * - Featured products preview
 * - Why choose us section
 * - Customer testimonials
 * - Call to action section
 */
function Home() {
  // Featured products data for display on home page
  const featuredProducts = [
    {
      id: 1,
      name: 'Coffee Tables',
      description: 'Elegant handcrafted coffee tables that become the centerpiece of your living room.',
      image: '/images/coffee-table-placeholder.jpg',
    },
    {
      id: 2,
      name: 'Study Tables',
      description: 'Functional and stylish desks perfect for home offices and study spaces.',
      image: '/images/study-table-placeholder.jpg',
    },
    {
      id: 3,
      name: 'Kitchen Units',
      description: 'Custom-designed kitchen installations tailored to your space and style.',
      image: '/images/kitchen-unit-placeholder.jpg',
    },
  ]

  // Customer testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Sarah M.',
      text: 'OAKTIMBER transformed my living room with a beautiful custom coffee table. The craftsmanship is outstanding!',
      rating: 5,
    },
    {
      id: 2,
      name: 'John K.',
      text: 'Professional service from start to finish. My kitchen units are exactly what I envisioned. Highly recommend!',
      rating: 5,
    },
    {
      id: 3,
      name: 'Grace T.',
      text: 'The attention to detail and quality of work is remarkable. My study desk is both beautiful and functional.',
      rating: 5,
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

            {/* Right side - Hero Image */}
            <div className="relative animate-slide-in-right">
              <div className="aspect-square rounded-2xl shadow-2xl overflow-hidden">
                {/* Hero image */}
                <img 
                  src="/images/hero image.png" 
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
            {featuredProducts.map((product) => (
              <div key={product.id} className="card group">
                {/* Product image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                  <p className="text-white font-semibold">Product Image</p>
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
            ))}
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
            
            {/* Left side - Image placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-300 to-primary-600 shadow-xl flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <p className="text-xl font-semibold mb-2">Workshop Image</p>
                  <p className="text-sm opacity-90">
                    Photo of craftsman at work or finished product
                  </p>
                </div>
              </div>
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

      {/* Testimonials Section */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">What Our Clients Say</h2>
            <p className="text-primary-200 text-lg max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-primary-800 p-6 rounded-lg space-y-4">
                {/* Star rating */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                
                {/* Testimonial text */}
                <p className="text-primary-100 italic">
                  "{testimonial.text}"
                </p>
                
                {/* Customer name */}
                <p className="font-semibold text-primary-200">
                  - {testimonial.name}
                </p>
              </div>
            ))}
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

