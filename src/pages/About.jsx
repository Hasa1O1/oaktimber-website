import React from 'react'
import { FaHammer, FaLeaf, FaHeart, FaAward } from 'react-icons/fa'

/**
 * About Page Component
 * 
 * This page tells the story of OAKTIMBER
 * Contains:
 * - Company introduction and mission
 * - Owner/founder information
 * - Materials and craftsmanship philosophy
 * - Core values
 * - Process overview
 */
function About() {
  // Core values of the business
  const values = [
    {
      icon: <FaHammer className="text-4xl" />,
      title: 'Expert Craftsmanship',
      description: 'Every piece is crafted with precision and care by skilled artisans who take pride in their work.',
    },
    {
      icon: <FaLeaf className="text-4xl" />,
      title: 'Quality Materials',
      description: 'We use only premium materials including maple wood, MDF, and high-grade compressed boards.',
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: 'Customer Focus',
      description: 'Your satisfaction is our priority. We work closely with you to bring your vision to life.',
    },
    {
      icon: <FaAward className="text-4xl" />,
      title: 'Excellence',
      description: 'We are committed to delivering furniture that exceeds expectations in quality and design.',
    },
  ]

  // Materials we work with
  const materials = [
    {
      name: 'Maple Wood',
      description: 'Premium hardwood known for its strength, durability, and beautiful grain patterns.',
    },
    {
      name: 'MDF (Medium Density Fiberboard)',
      description: 'Engineered wood product that provides a smooth, stable surface perfect for painted finishes.',
    },
    {
      name: 'Compressed Wood Boards',
      description: 'Cost-effective and environmentally friendly material suitable for various applications.',
    },
  ]

  // Our process steps
  const processSteps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'We meet with you to understand your needs, space, and design preferences.',
    },
    {
      number: '02',
      title: 'Design',
      description: 'Our team creates custom designs tailored to your specifications and budget.',
    },
    {
      number: '03',
      title: 'Crafting',
      description: 'Skilled craftsmen bring the design to life using premium materials and techniques.',
    },
    {
      number: '04',
      title: 'Installation',
      description: 'Professional installation ensures perfect fit and finish in your space.',
    },
  ]

  return (
    <div className="min-h-screen">
      
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-100 to-accent-cream section-padding">
        <div className="container-custom text-center">
          <h1 className="text-primary-900 mb-6 animate-fade-in">
            About OAKTIMBER
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Where passion for woodworking meets dedication to quality
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left side - Image placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-300 to-primary-600 shadow-xl flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <p className="text-xl font-semibold mb-2">Business Owner Photo</p>
                  <p className="text-sm opacity-90">
                    Photo of Dingani Leonard Peleka or workshop
                  </p>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-400 rounded-2xl opacity-20 -z-10"></div>
            </div>

            {/* Right side - Story content */}
            <div className="space-y-6">
              <h2 className="text-primary-900">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  OAKTIMBER was founded with a simple yet powerful vision: to create beautiful, 
                  functional wooden furniture that transforms houses into homes. What started as 
                  a passion for woodworking has grown into a thriving carpentry workshop known 
                  for quality craftsmanship and attention to detail.
                </p>
                <p>
                  Led by owner Dingani Leonard Peleka, our team of skilled craftsmen combines 
                  traditional woodworking techniques with modern design sensibilities. We believe 
                  that furniture should be more than just functional - it should tell a story, 
                  reflect your personality, and stand the test of time.
                </p>
                <p>
                  From our workshop, we've created countless pieces that have brought joy and 
                  functionality to homes and businesses across the region. Each project is 
                  approached with fresh enthusiasm and a commitment to excellence that has 
                  become our hallmark.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Philosophy Section */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Mission Statement */}
            <div className="text-center space-y-4">
              <h2 className="text-primary-900">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To deliver exceptional handcrafted furniture and custom installations that combine 
                superior craftsmanship, premium materials, and timeless design. We are committed to 
                exceeding our clients' expectations while building lasting relationships based on 
                trust and quality.
              </p>
            </div>

            {/* Philosophy */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-primary-800 mb-4 text-center">
                Our Craftsmanship Philosophy
              </h3>
              <p className="text-gray-700 leading-relaxed text-center">
                We believe that true craftsmanship is about more than just building furniture - 
                it's about creating pieces that enhance your daily life. Every joint, every finish, 
                every detail is carefully considered and expertly executed. We take pride in our work 
                and stand behind every piece that leaves our workshop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-primary-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-4 p-6 rounded-lg hover:bg-primary-50 transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary-800">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">Materials We Use</h2>
            <p className="text-primary-200 text-lg max-w-2xl mx-auto">
              We carefully select premium materials to ensure durability and beauty
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {materials.map((material, index) => (
              <div key={index} className="bg-primary-800 rounded-lg p-6 space-y-3">
                <h3 className="text-xl font-semibold text-primary-100">
                  {material.name}
                </h3>
                <p className="text-primary-200">
                  {material.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-primary-900 mb-4">Our Process</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              From concept to completion - how we bring your vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-primary-50 rounded-lg p-6 space-y-4 h-full hover:shadow-lg transition-shadow">
                  <div className="text-5xl font-bold text-primary-200">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-primary-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                {/* Arrow connector - hide on last item and on mobile */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary-300 text-2xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Ready to start your custom furniture project? Get in touch with us today.
          </p>
          <a href="/contact" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}

export default About

