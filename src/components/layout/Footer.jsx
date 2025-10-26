import React from 'react'
import { Link } from 'react-router-dom'
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

/**
 * Footer component displayed at the bottom of every page
 * 
 * Contains:
 * - Business information and branding
 * - Quick navigation links
 * - Contact information
 * - Social media links
 * - Copyright notice
 */
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-900 text-white">
      {/* Main Footer Content */}
      <div className="container-custom px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">O</span>
              </div>
              <h3 className="text-xl font-bold">OAKTIMBER</h3>
            </div>
            <p className="text-primary-200 text-sm leading-relaxed">
              Quality craftsmanship meets timeless design. We create handcrafted wooden furniture 
              and custom installations that bring warmth and elegance to your space.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-100">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-primary-200 hover:text-white transition-colors">
                  Products & Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-primary-200 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-100">Our Services</h4>
            <ul className="space-y-2 text-primary-200 text-sm">
              <li>• Custom Furniture Manufacturing</li>
              <li>• Kitchen Unit Installations</li>
              <li>• TV Stand & Entertainment Units</li>
              <li>• Curtain Rod Installation</li>
              <li>• Wall Art & Decor</li>
              <li>• Drilling Services</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-100">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaPhone className="text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-primary-200">Phone</p>
                  <a href="tel:0973131425" className="text-white hover:text-primary-300 transition-colors">
                    0973 131 425
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaEnvelope className="text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-primary-200">Email</p>
                  <a href="mailto:Dinganipeleka15@gmail.com" className="text-white hover:text-primary-300 transition-colors break-all">
                    Dinganipeleka15@gmail.com
                  </a>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div>
                <p className="text-sm text-primary-200 mb-2">Follow Us</p>
                <div className="flex space-x-4">
                  <a 
                    href="https://wa.me/260973131425" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-300 hover:text-white transition-colors text-xl"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                  <a 
                    href="https://www.facebook.com/share/16eyYVLpiW/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-300 hover:text-white transition-colors text-xl"
                    aria-label="Facebook"
                  >
                    <FaFacebook />
                  </a>
                  <a 
                    href="https://www.instagram.com/oakk_timber?igsh=bGowd3dhcHI0a3Nt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-300 hover:text-white transition-colors text-xl"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-primary-800">
        <div className="container-custom px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-300">
            <p>© {currentYear} OAKTIMBER. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              Owned by Dingani Leonard Peleka
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

