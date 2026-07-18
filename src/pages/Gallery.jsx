import React, { useEffect, useState } from 'react'
import { FaCheck, FaChevronLeft, FaChevronRight, FaPencilAlt, FaPlus, FaTimes, FaTrash, FaShoppingBag } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import EditableText from '../components/EditableText'
import CardModal from '../components/CardModal'
import ConfirmModal from '../components/ConfirmModal'
import useAdminMode from '../hooks/useAdminMode'
import { useCards } from '../hooks/useCards'
import { defaultGalleryCards } from '../data/cards'

const truncateModalTitle = (value, maxLength = 60) => {
  const text = value || 'this card'
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text
}

function Gallery() {
  const { isAdmin } = useAdminMode()
  const { cards, createCard, updateCard, deleteCard } = useCards('gallery', defaultGalleryCards)
  const [galleryImageIndices, setGalleryImageIndices] = useState({})
  const [editingCard, setEditingCard] = useState(null)
  const [deletingCard, setDeletingCard] = useState(null)
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [expandedCard, setExpandedCard] = useState(null)

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

  const navigateGalleryImage = (cardId, direction) => {
    setGalleryImageIndices((prev) => {
      const currentIndex = prev[cardId] || 0
      const card = cards.find((item) => item.id === cardId)
      const maxIndex = card?.images?.length ? card.images.length - 1 : 0

      const newIndex = direction === 'next'
        ? currentIndex >= maxIndex ? 0 : currentIndex + 1
        : currentIndex <= 0 ? maxIndex : currentIndex - 1

      return { ...prev, [cardId]: newIndex }
    })
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-100 to-accent-cream section-padding">
        <div className="container-custom text-center">
          <h1 className="text-wood-dark mb-6 animate-fade-in">
            <EditableText page="gallery" section="page_title" defaultValue="Gallery" />
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            <EditableText
              page="gallery"
              section="page_intro"
              defaultValue="Explore completed OAKTIMBER projects, custom furniture, and installation work."
              multiline
            />
          </p>
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
                Add Gallery Card
              </button>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card) => {
              const currentImageIndex = galleryImageIndices[card.id] || 0
              const currentImage = card.images ? card.images[currentImageIndex] : card.image_url
              const hasMultipleImages = card.images && card.images.length > 1

              return (
                <div key={card.id} className="card-overlay animate-fade-in group relative h-[500px]">
                  {isAdmin && (
                    <div className="absolute right-3 top-3 z-30 flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(card)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700"
                        aria-label="Edit gallery card"
                      >
                        <FaPencilAlt className="text-sm" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingCard(card)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700"
                        aria-label="Delete gallery card"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  )}

                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt={card.title || card.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onTouchStart={(e) => {
                        e.currentTarget.dataset.touchStartX = e.touches[0].clientX
                      }}
                      onTouchEnd={(e) => {
                        const touchStartX = parseFloat(e.currentTarget.dataset.touchStartX)
                        const touchEndX = e.changedTouches[0].clientX
                        const diff = touchStartX - touchEndX
                        
                        if (Math.abs(diff) > 50) {
                          if (diff > 0) {
                            navigateGalleryImage(card.id, 'next')
                          } else {
                            navigateGalleryImage(card.id, 'prev')
                          }
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <p className="font-semibold">{card.title || card.name}</p>
                        <p className="text-sm opacity-90 mt-1">Gallery Image</p>
                      </div>
                    </div>
                  )}

                  <div className="card-overlay-content">
                    <div className="flex justify-between items-start">
                      {card.featured && (
                        <span className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Top Pick
                        </span>
                      )}
                      <button className="text-white hover:text-white/80 transition-colors">
                        <FaShoppingBag className="text-xl" />
                      </button>
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <h3 className="text-white text-2xl font-bold mb-2 line-clamp-1">
                        {card.title || card.name}
                      </h3>
                      <p className="text-white/90 text-sm line-clamp-3">
                        {card.description}
                      </p>

                      {hasMultipleImages && (
                        <div className="flex gap-2 mt-3">
                          {card.images.map((_, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                setGalleryImageIndices((prev) => ({ ...prev, [card.id]: index }))
                              }}
                              className={`cursor-pointer w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${
                                index === currentImageIndex ? 'border-white' : 'border-transparent'
                              }`}
                            >
                              <img
                                src={card.images[index]}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {hasMultipleImages && (
                      <div className="flex gap-2 mt-4">
                        <button
                          type="button"
                          onClick={() => navigateGalleryImage(card.id, 'prev')}
                          className="flex-1 bg-white/90 text-black font-semibold py-3 rounded-lg hover:bg-white transition-colors flex items-center justify-center"
                        >
                          <FaChevronLeft />
                        </button>
                        {(card.description || (card.features && card.features.length > 0)) && (
                          <button
                            type="button"
                            onClick={() => setExpandedCard(card)}
                            className="flex-1 bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            Read More
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => navigateGalleryImage(card.id, 'next')}
                          className="flex-1 bg-white/90 text-black font-semibold py-3 rounded-lg hover:bg-white transition-colors flex items-center justify-center"
                        >
                          <FaChevronRight />
                        </button>
                      </div>
                    )}

                    {!hasMultipleImages && (card.description || (card.features && card.features.length > 0)) && (
                      <button
                        type="button"
                        onClick={() => setExpandedCard(card)}
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
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-6">
            <EditableText page="gallery" section="cta_title" defaultValue="Need Something Similar?" />
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            <EditableText
              page="gallery"
              section="cta_text"
              defaultValue="Contact us with your idea and we will help turn it into a practical, well-crafted piece."
              multiline
            />
          </p>
          <a
            href="/contact"
            className="px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
          >
            Request a Quote
          </a>
        </div>
      </section>

      <CardModal
        page="gallery"
        card={editingCard}
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        onSave={handleSaveCard}
      />
      <ConfirmModal
        isOpen={Boolean(deletingCard)}
        title="Delete Gallery Card?"
        message={`This will permanently delete "${truncateModalTitle(deletingCard?.title || deletingCard?.name)}" from the website. This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeletingCard(null)
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
                aria-label="Close gallery details"
              >
                <FaTimes />
              </button>
            </div>
            <div className="space-y-5 p-5">
              {expandedCard.image_url || expandedCard.images?.[0] ? (
                <img
                  src={expandedCard.image_url || expandedCard.images[0]}
                  alt={expandedCard.title || expandedCard.name}
                  className="h-72 w-full rounded-lg bg-gray-100 object-cover"
                />
              ) : (
                <div className="h-72 w-full rounded-lg bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                  <p className="text-white font-semibold">{expandedCard.title || expandedCard.name}</p>
                </div>
              )}
              <p className="text-gray-700">{expandedCard.description}</p>
              {expandedCard.features?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {expandedCard.features.map((feature, index) => (
                    <span key={index} className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
