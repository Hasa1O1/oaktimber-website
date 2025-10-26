import React, { useState } from 'react'
import { FaPhone, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaClock, FaUser, FaSms, FaTimes } from 'react-icons/fa'

/**
 * Contact Page Component
 * 
 * Provides ways for customers to get in touch
 * Contains:
 * - Contact form for inquiries and quote requests
 * - Business contact information
 * - Operating hours
 * - Map location (placeholder)
 * - Direct contact methods (phone, email, WhatsApp)
 */
function Contact() {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  
  // Form submission status
  const [submitStatus, setSubmitStatus] = useState(null)
  
  // Modal state for sending options
  const [showSendModal, setShowSendModal] = useState(false)

  // Service options for the dropdown
  const serviceOptions = [
    'General Inquiry',
    'Request a Quote',
    'Custom Furniture Design',
    'Kitchen Unit Installation',
    'TV Stand Installation',
    'Curtain Rod Installation',
    'Wall Art Installation',
    'Drilling Services',
    'Repair & Refinishing',
    'Other',
  ]

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus(null)
      }, 3000)
      return
    }
    
    // Open modal with sending options
    setShowSendModal(true)
  }
  
  // Generate formatted message for sharing
  const generateMessage = () => {
    return `Hello from ${formData.name}!

Service: ${formData.service}
Contact: ${formData.phone}
Email: ${formData.email}

Message:
${formData.message}

Requested via OAKTIMBER website.`
  }
  
  // Handle email sending
  const handleSendEmail = () => {
    const subject = `New Contact: ${formData.service} - ${formData.name}`
    const body = generateMessage()
    const mailtoLink = `mailto:Dinganipeleka15@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink
    resetFormAndCloseModal()
  }
  
  // Handle WhatsApp sending
  const handleSendWhatsApp = () => {
    const message = `Hello OAKTIMBER,%0A%0A${generateMessage()}`
    const whatsappLink = `https://wa.me/260973131425?text=${encodeURIComponent(message.replace(/%0A/g, '\n'))}`
    window.open(whatsappLink, '_blank')
    resetFormAndCloseModal()
  }
  
  // Handle SMS sending
  const handleSendSMS = () => {
    const body = generateMessage()
    const smsLink = `sms:0973131425?body=${encodeURIComponent(body)}`
    window.location.href = smsLink
    resetFormAndCloseModal()
  }
  
  // Reset form and close modal
  const resetFormAndCloseModal = () => {
    setShowSendModal(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    })
    setSubmitStatus('success')
    setTimeout(() => {
      setSubmitStatus(null)
    }, 5000)
  }
  
  // Close modal
  const closeModal = () => {
    setShowSendModal(false)
  }

  return (
    <div className="min-h-screen">
      
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-100 to-accent-cream section-padding">
        <div className="container-custom text-center">
          <h1 className="text-primary-900 mb-6 animate-fade-in">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? We'd love to hear from you. Fill out the form below or reach out directly.
          </p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Form - Takes up 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-primary-50 rounded-2xl p-8 shadow-lg">
                <h2 className="text-primary-900 mb-6">Send Us a Message</h2>
                
                {/* Success message */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    <p className="font-semibold">Thank you for your message!</p>
                    <p className="text-sm">We'll get back to you as soon as possible.</p>
                  </div>
                )}
                
                {/* Error message */}
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <p className="font-semibold">Please fill in all required fields.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-primary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email and Phone in a row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-primary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-primary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                        placeholder="0971234567"
                      />
                    </div>
                  </div>

                  {/* Service dropdown */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interested In *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-primary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message textarea */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 rounded-lg border border-primary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
                      placeholder="Tell us about your project, including dimensions, materials, timeline, and any specific requirements..."
                    ></textarea>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full btn-primary text-lg py-4"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="space-y-6">
              
              {/* Contact details card */}
              <div className="card p-6 space-y-6">
                <h3 className="text-xl font-semibold text-primary-800">Contact Information</h3>
                
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FaPhone className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Phone</p>
                    <a href="tel:0973131425" className="text-primary-600 hover:text-primary-700">
                      0973 131 425
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Email</p>
                    <a 
                      href="mailto:Dinganipeleka15@gmail.com" 
                      className="text-primary-600 hover:text-primary-700 break-all text-sm"
                    >
                      Dinganipeleka15@gmail.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FaWhatsapp className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">WhatsApp</p>
                    <a 
                      href="https://wa.me/260973131425" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Chat with us
                    </a>
                  </div>
                </div>

                {/* Owner */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FaUser className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Owner</p>
                    <p className="text-gray-700">Dingani Leonard Peleka</p>
                  </div>
                </div>
              </div>

              {/* Business hours card */}
              <div className="card p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FaClock className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-800">Business Hours</h3>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium text-gray-900">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium text-gray-900">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-gray-900">Closed</span>
                  </div>
                </div>
              </div>

              {/* Quick response note */}
              <div className="bg-primary-900 text-white rounded-lg p-6">
                <h4 className="font-semibold mb-2">Quick Response Guarantee</h4>
                <p className="text-sm text-primary-200">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Placeholder */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-primary-900 mb-4">Find Us</h2>
            <p className="text-gray-700">Visit our workshop to see our work firsthand</p>
          </div>
          
          {/* Map placeholder */}
          <div className="aspect-video max-w-4xl mx-auto bg-gradient-to-br from-primary-200 to-primary-400 rounded-2xl shadow-xl flex items-center justify-center">
            <div className="text-center text-white p-8">
              <FaMapMarkerAlt className="text-6xl mb-4 mx-auto" />
              <p className="text-xl font-semibold mb-2">Google Map Location</p>
              <p className="text-sm opacity-90">
                Replace this with an embedded Google Map showing workshop location
              </p>
              <p className="text-sm opacity-90 mt-2">
                Add your specific address here
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-primary-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-700">Quick answers to common questions</p>
          </div>

          <div className="space-y-6">
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-800 mb-2">
                How long does a custom furniture project take?
              </h3>
              <p className="text-gray-700">
                Timeline varies depending on the complexity and size of the project. Simple pieces 
                typically take 1-2 weeks, while larger custom installations may take 3-4 weeks. 
                We'll provide a specific timeline during your consultation.
              </p>
            </div>

            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-800 mb-2">
                Do you provide free quotes?
              </h3>
              <p className="text-gray-700">
                Yes! We offer free consultations and quotes. Contact us with your project details, 
                and we'll provide a detailed estimate at no cost.
              </p>
            </div>

            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-800 mb-2">
                What materials do you work with?
              </h3>
              <p className="text-gray-700">
                We work with a variety of premium materials including maple wood, MDF (Medium Density 
                Fiberboard), and high-quality compressed wood boards. We'll help you choose the best 
                material for your specific needs and budget.
              </p>
            </div>

            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-800 mb-2">
                Do you offer installation services?
              </h3>
              <p className="text-gray-700">
                Absolutely! We provide professional installation for all our products, including 
                kitchen units, TV stands, curtain rods, and wall art. Installation is included in 
                most of our quotes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Send Message Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-primary-900 text-white p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Choose How to Send</h3>
              <button 
                onClick={closeModal}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>

            {/* Modal Body - Preview of message */}
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Message Preview:</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                    {generateMessage()}
                  </pre>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm text-center">
                Select a platform to send your message. The form data will be auto-filled.
              </p>
            </div>

            {/* Modal Footer - Action Buttons */}
            <div className="p-6 bg-gray-50 flex flex-col sm:flex-row gap-4">
              {/* Email Button */}
              <button
                onClick={handleSendEmail}
                className="flex-1 flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors shadow-lg"
              >
                <FaEnvelope className="text-xl" />
                Send via Email
              </button>

              {/* WhatsApp Button */}
              <button
                onClick={handleSendWhatsApp}
                className="flex-1 flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors shadow-lg"
              >
                <FaWhatsapp className="text-xl" />
                Send via WhatsApp
              </button>

              {/* SMS Button */}
              <button
                onClick={handleSendSMS}
                className="flex-1 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors shadow-lg"
              >
                <FaSms className="text-xl" />
                Send via SMS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact

