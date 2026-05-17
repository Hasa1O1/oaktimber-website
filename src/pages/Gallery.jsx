import React, { useState } from 'react'
import { FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa'
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
    </div>
  )
}

export default Gallery
