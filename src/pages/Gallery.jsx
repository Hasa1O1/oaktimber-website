import React, { useEffect, useRef, useState } from 'react'
import { FaPencilAlt, FaPlus, FaTimes, FaTrash } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import EditableText from '../components/EditableText'
import CardModal from '../components/CardModal'
import useAdminMode from '../hooks/useAdminMode'
import { useCards } from '../hooks/useCards'
import { defaultGalleryCards } from '../data/cards'

function Gallery() {
  const { isAdmin } = useAdminMode()
  const { cards, createCard, updateCard, deleteCard } = useCards('gallery', defaultGalleryCards)
  const [editingCard, setEditingCard] = useState(null)
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [expandedCard, setExpandedCard] = useState(null)
  const [overflowingCards, setOverflowingCards] = useState({})
  const cardTextRefs = useRef({})

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

  async function handleDeleteCard(card) {
    const confirmed = window.confirm(`Delete "${card.title || card.name}"?`)
    if (!confirmed) return

    try {
      await deleteCard(card.id)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const measureOverflow = () => {
      const nextOverflowingCards = {}

      cards.forEach((card) => {
        const element = cardTextRefs.current[card.id]
        if (!element) return

        nextOverflowingCards[card.id] = element.scrollHeight > element.clientHeight + 1
      })

      setOverflowingCards(nextOverflowingCards)
    }

    const frame = requestAnimationFrame(measureOverflow)
    window.addEventListener('resize', measureOverflow)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', measureOverflow)
    }
  }, [cards])

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-100 to-accent-cream section-padding">
        <div className="container-custom text-center">
          <h1 className="text-primary-900 mb-6 animate-fade-in">
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
            {cards.map((card) => (
              <div key={card.id} className="card group relative animate-fade-in">
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
                      onClick={() => handleDeleteCard(card)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700"
                      aria-label="Delete gallery card"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                )}

                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  {card.image_url || card.images?.[0] ? (
                    <img
                      src={card.image_url || card.images[0]}
                      alt={card.title || card.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-200 to-primary-400 p-4 text-center text-white">
                      <p className="font-semibold">{card.title || card.name}</p>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-primary-800 group-hover:text-primary-600 transition-colors">
                    {card.title || card.name}
                  </h3>
                  <div
                    ref={(element) => {
                      cardTextRefs.current[card.id] = element
                    }}
                    className="h-[120px] overflow-hidden"
                  >
                    <p className="text-gray-600">
                      {card.description}
                    </p>
                    {card.features?.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {card.features.map((feature, index) => (
                          <span key={index} className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {overflowingCards[card.id] && (
                    <button
                      type="button"
                      onClick={() => setExpandedCard(card)}
                      className="font-semibold text-primary-600 hover:text-primary-700"
                    >
                      Read More
                    </button>
                  )}
                </div>
              </div>
            ))}
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
      {expandedCard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setExpandedCard(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <h3 className="text-2xl font-semibold text-primary-900">{expandedCard.title || expandedCard.name}</h3>
              <button
                type="button"
                onClick={() => setExpandedCard(null)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
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
