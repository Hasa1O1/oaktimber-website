import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FaCheck, FaChevronLeft, FaChevronRight, FaPencilAlt, FaPlus, FaTimes, FaTrash, FaShoppingBag } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import EditableText from '../components/EditableText'
import CardModal from '../components/CardModal'
import ConfirmModal from '../components/ConfirmModal'
import useAdminMode from '../hooks/useAdminMode'
import { useCards } from '../hooks/useCards'
import { defaultProductCards } from '../data/cards'

const truncateModalTitle = (value, maxLength = 60) => {
  const text = value || 'this card'
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text
}

function Products() {
  const { isAdmin } = useAdminMode()
  const { cards: products, createCard, updateCard, deleteCard } = useCards('products', defaultProductCards)
  const [activeCategory, setActiveCategory] = useState('all')
  const [productImageIndices, setProductImageIndices] = useState({})
  const [editingCard, setEditingCard] = useState(null)
  const [deletingCard, setDeletingCard] = useState(null)
  const [expandedCard, setExpandedCard] = useState(null)
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [overflowingCards, setOverflowingCards] = useState({})
  const cardTextRefs = useRef({})

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'installations', name: 'Installations' },
    { id: 'services', name: 'Services' },
  ]

  const filteredProducts = useMemo(() => (
    activeCategory === 'all'
      ? products
      : products.filter((product) => product.category === activeCategory)
  ), [activeCategory, products])

  useEffect(() => {
    const measureOverflow = () => {
      const nextOverflowingCards = {}

      filteredProducts.forEach((product) => {
        const element = cardTextRefs.current[product.id]
        if (!element) return

        nextOverflowingCards[product.id] = element.scrollHeight > element.clientHeight + 1
      })

      setOverflowingCards(nextOverflowingCards)
    }

    const frame = requestAnimationFrame(measureOverflow)
    window.addEventListener('resize', measureOverflow)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', measureOverflow)
    }
  }, [filteredProducts])

  const navigateProductImage = (productId, direction) => {
    setProductImageIndices((prev) => {
      const currentIndex = prev[productId] || 0
      const product = products.find((item) => item.id === productId)
      const maxIndex = product?.images?.length ? product.images.length - 1 : 0

      const newIndex = direction === 'next'
        ? currentIndex >= maxIndex ? 0 : currentIndex + 1
        : currentIndex <= 0 ? maxIndex : currentIndex - 1

      return { ...prev, [productId]: newIndex }
    })
  }

  function openCreateModal() {
    setEditingCard(null)
    setIsCardModalOpen(true)
  }

  function openEditModal(card) {
    setEditingCard(card)
    setIsCardModalOpen(true)
  }

  async function handleSaveCard(input) {
    try {
      if (editingCard) {
        await updateCard(editingCard.id, input)
      } else {
        await createCard(input)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  async function handleConfirmDelete() {
    if (!deletingCard) return
    setIsDeleting(true)
    try {
      await deleteCard(deletingCard.id)
      setDeletingCard(null)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-100 to-accent-cream section-padding">
        <div className="container-custom text-center">
          <h1 className="text-wood-dark mb-6 animate-fade-in">
            <EditableText page="products" section="page_title" defaultValue="Products & Services" />
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            <EditableText
              page="products"
              section="page_intro"
              defaultValue="Discover our range of handcrafted furniture and professional installation services"
              multiline
            />
          </p>
        </div>
      </section>

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

      <section className="section-padding bg-accent-cream">
        <div className="container-custom">
          {isAdmin && (
            <div className="mb-8 flex justify-end">
              <button
                type="button"
                onClick={openCreateModal}
                className="btn-primary inline-flex items-center gap-2"
              >
                <FaPlus />
                Add Product Card
              </button>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const currentImageIndex = productImageIndices[product.id] || 0
              const currentImage = product.images ? product.images[currentImageIndex] : product.image_url
              const hasMultipleImages = product.images && product.images.length > 1

              return (
                <div key={product.id} className="card-overlay animate-fade-in group relative h-[500px]">
                  {isAdmin && (
                    <div className="absolute right-3 top-3 z-30 flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(product)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700"
                        aria-label="Edit product card"
                      >
                        <FaPencilAlt className="text-sm" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingCard(product)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700"
                        aria-label="Delete product card"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  )}

                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt={product.title || product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <p className="font-semibold">{product.title || product.name}</p>
                        <p className="text-sm opacity-90 mt-1">Product Image</p>
                      </div>
                    </div>
                  )}

                  <div className="card-overlay-content">
                    <div className="flex justify-between items-start">
                      {product.featured && (
                        <span className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Top Pick
                        </span>
                      )}
                      <button className="text-white hover:text-white/80 transition-colors">
                        <FaShoppingBag className="text-xl" />
                      </button>
                    </div>

                    <div
                      ref={(element) => {
                        cardTextRefs.current[product.id] = element
                      }}
                      className="flex-1 overflow-hidden"
                    >
                      <h3 className="text-white text-2xl font-bold mb-2">
                        {product.title || product.name}
                      </h3>
                      {product.price && (
                        <span className="text-xl font-bold text-white mb-3 block">
                          {product.price}
                        </span>
                      )}
                      <p className="text-white/90 text-sm line-clamp-3">
                        {product.description}
                      </p>

                      {hasMultipleImages && (
                        <div className="flex gap-2 mt-3">
                          {product.images.map((_, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                setProductImageIndices((prev) => ({ ...prev, [product.id]: index }))
                              }}
                              className={`cursor-pointer w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${
                                index === currentImageIndex ? 'border-white' : 'border-transparent'
                              }`}
                            >
                              <img
                                src={product.images[index]}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {overflowingCards[product.id] && (
                      <button
                        type="button"
                        onClick={() => setExpandedCard(product)}
                        className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors mt-4"
                      >
                        Read More
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-primary-900 mb-4">
                <EditableText page="products" section="additional_services_title" defaultValue="Additional Services" />
              </h2>
              <p className="text-lg text-gray-700">
                <EditableText
                  page="products"
                  section="additional_services_intro"
                  defaultValue="Beyond our standard offerings, we provide comprehensive carpentry solutions"
                  multiline
                />
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                ['custom_design', 'Custom Design', 'Have a unique vision? We specialize in custom furniture design tailored to your specific requirements, space, and style preferences. From initial sketch to final installation, we work closely with you every step of the way.'],
                ['consultation', 'Consultation', "Not sure what you need? Schedule a free consultation where we'll assess your space, discuss your needs, and provide expert recommendations. We'll help you choose the right materials, styles, and solutions for your project."],
                ['repair', 'Repair & Refinishing', 'Already have furniture that needs some love? We offer repair and refinishing services to restore your wooden furniture to its former glory. From structural repairs to complete refinishing, we can help.'],
                ['commercial', 'Commercial Projects', 'We work with businesses too! Whether you need office furniture, restaurant seating, or retail fixtures, we can handle commercial projects of various scales with the same attention to quality and detail.'],
              ].map(([key, title, description]) => (
                <div key={key} className="bg-primary-50 rounded-lg p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-primary-800">
                    <EditableText page="products" section={`${key}_title`} defaultValue={title} />
                  </h3>
                  <p className="text-gray-700">
                    <EditableText page="products" section={`${key}_description`} defaultValue={description} multiline />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-white mb-4">
              <EditableText page="products" section="materials_title" defaultValue="Quality Materials" />
            </h2>
            <p className="text-primary-200 text-lg">
              <EditableText
                page="products"
                section="materials_intro"
                defaultValue="All our products are crafted using premium materials including:"
                multiline
              />
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {['Maple Wood', 'MDF Boards', 'Compressed Wood', 'Quality Hardware'].map((material) => (
                <span key={material} className="px-6 py-3 bg-primary-800 rounded-full text-primary-100 font-medium">
                  {material}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-6">
            <EditableText page="products" section="cta_title" defaultValue="Interested in Our Products or Services?" />
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            <EditableText
              page="products"
              section="cta_text"
              defaultValue="Contact us today for a free consultation and quote. We'll help you find the perfect solution for your needs."
              multiline
            />
          </p>
          <a href="/contact" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
            Request a Quote
          </a>
        </div>
      </section>

      <CardModal
        page="products"
        card={editingCard}
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        onSave={handleSaveCard}
      />
      <ConfirmModal
        isOpen={Boolean(deletingCard)}
        title="Delete Product Card?"
        message={`This will permanently delete "${truncateModalTitle(deletingCard?.title || deletingCard?.name)}" from the website. This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (!isDeleting) setDeletingCard(null)
        }}
      />
      {expandedCard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setExpandedCard(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 p-5">
              <h3 className="min-w-0 truncate text-2xl font-semibold text-primary-900">{expandedCard.title || expandedCard.name}</h3>
              <button
                type="button"
                onClick={() => setExpandedCard(null)}
                className="flex-shrink-0 rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close product details"
              >
                <FaTimes />
              </button>
            </div>
            <div className="space-y-5 p-5">
              {expandedCard.images?.[0] && (
                <img
                  src={expandedCard.images[0]}
                  alt={expandedCard.title || expandedCard.name}
                  className="h-72 w-full rounded-lg bg-gray-100 object-contain"
                />
              )}
              <p className="text-gray-700">{expandedCard.description}</p>
              {expandedCard.features?.length > 0 && (
                <ul className="space-y-2">
                  {expandedCard.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-4 h-4 rounded-full bg-primary-100 flex items-center justify-center">
                          <FaCheck className="text-primary-600 text-xs" />
                        </div>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
