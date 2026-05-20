import React from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaFacebook, FaInstagram, FaPhone, FaWhatsapp } from 'react-icons/fa'
import EditableText from '../EditableText'
import useSiteContent from '../../hooks/useSiteContent'

function phoneHref(phone) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

function whatsappHref(phone) {
  const digits = phone.replace(/[^\d]/g, '')
  return `https://wa.me/${digits.startsWith('260') ? digits : `260${digits.replace(/^0/, '')}`}`
}

function Footer() {
  const currentYear = new Date().getFullYear()
  const phone = useSiteContent('contact', 'phone', '0973 131 425')
  const email = useSiteContent('contact', 'email', 'Dinganipeleka15@gmail.com')
  const whatsapp = useSiteContent('contact', 'whatsapp', '0973 131 425')
  const owner = useSiteContent('contact', 'owner', 'Dingani Leonard Peleka')
  const facebook = useSiteContent('footer', 'facebook_url', 'https://www.facebook.com/share/16eyYVLpiW/')
  const instagram = useSiteContent('footer', 'instagram_url', 'https://www.instagram.com/oaktimber_zambia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==')

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-custom px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <p className="text-primary-200 text-sm leading-relaxed">
              <EditableText
                page="footer"
                section="company_text"
                defaultValue="Quality craftsmanship meets timeless design. We create handcrafted wooden furniture and custom installations that bring warmth and elegance to your space."
                multiline
              />
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-100">
              <EditableText page="footer" section="quick_links_title" defaultValue="Quick Links" />
            </h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-primary-200 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-primary-200 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-primary-200 hover:text-white transition-colors">Products & Services</Link></li>
              <li><Link to="/gallery" className="text-primary-200 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="text-primary-200 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-100">
              <EditableText page="footer" section="contact_title" defaultValue="Contact Us" />
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaPhone className="text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-primary-200">Phone</p>
                  <a href={phoneHref(phone)} className="text-white hover:text-primary-300 transition-colors">
                    <EditableText page="contact" section="phone" defaultValue="0973 131 425" />
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaEnvelope className="text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-primary-200">Email</p>
                  <a href={`mailto:${email}`} className="text-white hover:text-primary-300 transition-colors break-all">
                    <EditableText page="contact" section="email" defaultValue="Dinganipeleka15@gmail.com" />
                  </a>
                </div>
              </div>

              <div>
                <p className="text-sm text-primary-200 mb-2">
                  <EditableText page="footer" section="follow_title" defaultValue="Follow Us" />
                </p>
                <div className="flex space-x-4">
                  <a href={whatsappHref(whatsapp)} target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-white transition-colors text-xl" aria-label="WhatsApp">
                    <FaWhatsapp />
                  </a>
                  <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-white transition-colors text-xl" aria-label="Facebook">
                    <FaFacebook />
                  </a>
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-white transition-colors text-xl" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-800">
        <div className="container-custom px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-300">
            <p>© {currentYear} OAKTIMBER. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              Owned by <EditableText page="contact" section="owner" defaultValue={owner} />
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
