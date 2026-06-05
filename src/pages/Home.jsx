import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import EditableText from '../components/EditableText'
import EditableImage from '../components/EditableImage'
import EditableHeroImages from '../components/EditableHeroImages'
import EditableFeaturedProducts from '../components/EditableFeaturedProducts'
import useAdminMode from '../hooks/useAdminMode'

function Home() {
  const { supabase } = useAdminMode()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [productImageIndices, setProductImageIndices] = useState({})
  const [heroImages, setHeroImages] = useState(['/images/hero image 3.png', '/images/hero image 2.png', '/images/hero image 1.jpg'])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loadingFeatured, setLoadingFeatured] = useState(false)

  const benefits = [
    'Premium quality materials (Maple wood, MDF, Compressed boards)',
    'Skilled craftsmanship with attention to detail',
    'Custom designs tailored to your space',
    'Professional installation services',
    'Competitive pricing',
    'Timely project completion',
  ]

  useEffect(() => {
    if (!supabase) return undefined

    let mounted = true

    async function loadHeroImages() {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('page', 'home')
        .eq('section', 'hero_images')
        .maybeSingle()

      if (!mounted) return

      if (!error && data?.content) {
        try {
          const parsed = JSON.parse(data.content)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setHeroImages(parsed)
          }
        } catch {
          // Fall back to default if JSON parsing fails
        }
      }
    }

    loadHeroImages()

    return () => {
      mounted = false
    }
  }, [supabase])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  useEffect(() => {
    if (!supabase) {
      setFeaturedProducts([])
      return undefined
    }

    let mounted = true

    async function loadFeaturedProducts() {
      setLoadingFeatured(true)
      try {
        // First, get the featured product IDs
        const { data: contentData, error: contentError } = await supabase
          .from('site_content')
          .select('content')
          .eq('page', 'home')
          .eq('section', 'featured_product_ids')
          .maybeSingle()

        if (!mounted) return

        if (contentError) throw contentError

        let featureIds = []
        if (contentData?.content) {
          try {
            featureIds = JSON.parse(contentData.content)
          } catch {
            featureIds = []
          }
        }

        if (featureIds.length === 0) {
          setFeaturedProducts([])
          setLoadingFeatured(false)
          return
        }

        // Then, fetch all cards and filter by featured IDs
        const { data: allCards, error: cardsError } = await supabase
          .from('cards')
          .select('*')

        if (!mounted) return

        if (cardsError) throw cardsError

        if (allCards) {
          const featured = allCards
            .filter((card) => featureIds.includes(card.id))
            .map((card) => ({
              ...card,
              images: card.image_urls?.length > 0 ? card.image_urls : card.image_url ? [card.image_url] : [],
              image_url: card.image_urls?.[0] || card.image_url,
              name: card.title || card.name,
            }))
            .sort((a, b) => featureIds.indexOf(a.id) - featureIds.indexOf(b.id))

          setFeaturedProducts(featured)
        }
      } catch (error) {
        console.error('Failed to load featured products:', error)
        setFeaturedProducts([])
      } finally {
        setLoadingFeatured(false)
      }
    }

    loadFeaturedProducts()

    return () => {
      mounted = false
    }
  }, [supabase])


  const navigateProductImage = (productId, direction) => {
    setProductImageIndices((prev) => {
      const currentIndex = prev[productId] || 0
      const product = featuredProducts.find((item) => item.id === productId)
      if (!product || !product.images || product.images.length === 0) return prev

      const maxIndex = product.images.length - 1
      const newIndex = direction === 'next'
        ? currentIndex >= maxIndex ? 0 : currentIndex + 1
        : currentIndex <= 0 ? maxIndex : currentIndex - 1

      return { ...prev, [productId]: newIndex }
    })
  }

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-primary-50 via-accent-cream to-primary-100 section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-primary-900 leading-tight">
                <EditableText page="home" section="hero_title" defaultValue="Crafting Timeless" />
                <span className="block text-primary-600">
                  <EditableText page="home" section="hero_highlight" defaultValue="Wooden Masterpieces" />
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                <EditableText
                  page="home"
                  section="hero_intro"
                  defaultValue="Transform your space with handcrafted furniture and custom installations. From elegant coffee tables to complete kitchen units, we bring your vision to life with premium materials and expert craftsmanship."
                  multiline
                />
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/contact" className="btn-primary inline-flex items-center justify-center gap-2">
                  Get a Free Quote
                  <FaArrowRight className="text-sm" />
                </Link>
                <Link to="/gallery" className="btn-secondary inline-flex items-center justify-center">
                  View Our Work
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 pt-6 border-t border-primary-200">
                <div>
                  <p className="text-3xl font-bold text-primary-700">
                    <EditableText page="home" section="stat_projects_value" defaultValue="100+" />
                  </p>
                  <p className="text-sm text-gray-600">
                    <EditableText page="home" section="stat_projects_label" defaultValue="Projects Completed" />
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary-700">
                    <EditableText page="home" section="stat_clients_value" defaultValue="50+" />
                  </p>
                  <p className="text-sm text-gray-600">
                    <EditableText page="home" section="stat_clients_label" defaultValue="Happy Clients" />
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary-700">
                    <EditableText page="home" section="stat_rating_value" defaultValue="5 Star" />
                  </p>
                  <p className="text-sm text-gray-600">
                    <EditableText page="home" section="stat_rating_label" defaultValue="Customer Rating" />
                  </p>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in-right h-96">
              {heroImages.map((image, index) => (
                <div
                  key={image}
                  className={`absolute inset-0 rounded-2xl overflow-hidden transition-opacity duration-700 ${
                    index === 0 ? 'shadow-lg transform -rotate-6 translate-y-4 translate-x-4 z-0' : ''
                  } ${index === 1 ? 'shadow-xl transform rotate-3 translate-y-2 translate-x-2 z-10' : ''} ${
                    index === 2 ? 'shadow-2xl z-20' : ''
                  } ${currentImageIndex === (heroImages.length - 1 - index) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <img src={image} alt="OAKTIMBER craftsmanship" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-600 rounded-2xl opacity-20 -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-400 rounded-full opacity-20 -z-10"></div>
            </div>
            <EditableHeroImages page="home" section="hero_images" defaultImages={heroImages} />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-primary-900 animate-slide-up">
              <EditableText page="home" section="welcome_title" defaultValue="Welcome to OAKTIMBER" />
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              <EditableText
                page="home"
                section="welcome_text"
                defaultValue="We are a dedicated carpentry workshop specializing in the design and manufacture of premium wooden furniture and custom installations. Every piece we create is crafted with precision, passion, and a commitment to quality that stands the test of time."
                multiline
              />
            </p>
            <Link to="/about" className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 gap-2">
              Learn More About Us
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-primary-900 mb-4">
              <EditableText page="home" section="featured_title" defaultValue="Featured Products & Services" />
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              <EditableText
                page="home"
                section="featured_intro"
                defaultValue="Explore our range of handcrafted furniture and professional installation services"
                multiline
              />
            </p>
          </div>

          {loadingFeatured ? (
            <div className="flex justify-center py-12">
              <p className="text-gray-600">Loading featured products...</p>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="rounded-lg bg-white p-12 text-center border-2 border-dashed border-primary-300">
              <p className="text-gray-600 mb-6">No featured products selected. Create cards in Products or Gallery first.</p>
              <EditableFeaturedProducts onFeaturedProductsChange={() => window.location.reload()} />
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {featuredProducts.map((product) => {
                  const imageIndex = productImageIndices[product.id] || 0
                  const currentImage = product.images?.[imageIndex] || product.image_url
                  const hasMultipleImages = product.images && product.images.length > 1

                  return (
                    <div key={product.id} className="card group">
                      <div className="relative aspect-square bg-gray-100 overflow-hidden">
                        {currentImage ? (
                          <img src={currentImage} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-200 to-primary-400">
                            <p className="text-center text-white font-semibold">{product.name}</p>
                          </div>
                        )}
                        {hasMultipleImages && (
                          <>
                            <button
                              onClick={(event) => {
                                event.preventDefault()
                                navigateProductImage(product.id, 'prev')
                              }}
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              aria-label="Previous image"
                            >
                              <FaChevronLeft className="text-sm" />
                            </button>
                            <button
                              onClick={(event) => {
                                event.preventDefault()
                                navigateProductImage(product.id, 'next')
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              aria-label="Next image"
                            >
                              <FaChevronRight className="text-sm" />
                            </button>
                          </>
                        )}
                      </div>
                      <div className="p-6 space-y-3">
                        <h3 className="text-primary-800 group-hover:text-primary-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600">
                          {product.description}
                        </p>
                        <Link to="/products" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 gap-2">
                          Learn More
                          <FaArrowRight className="text-xs" />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="text-center space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/products" className="btn-primary inline-flex items-center gap-2">
                    View All Products & Services
                    <FaArrowRight className="text-sm" />
                  </Link>
                  <EditableFeaturedProducts onFeaturedProductsChange={() => window.location.reload()} />
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <EditableImage
                page="home"
                section="why_choose_us_image"
                defaultValue="/images/why choose us image..jpg"
                alt="OAKTIMBER workshop and craftsmanship"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-400 rounded-2xl opacity-20 -z-10"></div>
            </div>

            <div className="space-y-6">
              <h2 className="text-primary-900">
                <EditableText page="home" section="why_title" defaultValue="Why Choose OAKTIMBER?" />
              </h2>
              <p className="text-gray-700 text-lg">
                <EditableText
                  page="home"
                  section="why_intro"
                  defaultValue="We combine traditional craftsmanship with modern design to deliver furniture that's built to last and beautiful to behold."
                  multiline
                />
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

      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-6">
            <EditableText page="home" section="cta_title" defaultValue="Ready to Transform Your Space?" />
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            <EditableText
              page="home"
              section="cta_text"
              defaultValue="Let's bring your vision to life with custom furniture and professional installations. Get in touch today for a free consultation and quote."
              multiline
            />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2">
              Contact Us Now
              <FaArrowRight />
            </Link>
            <Link to="/gallery" className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-700 transition-all duration-300 inline-flex items-center justify-center">
              View Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
