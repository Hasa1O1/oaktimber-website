import React, { useEffect, useState } from 'react'
import { FaPencilAlt, FaTimes, FaCheck } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import useAdminMode from '../hooks/useAdminMode'

function EditableFeaturedProducts({ onFeaturedProductsChange }) {
  const { isAdmin, supabase } = useAdminMode()
  const [open, setOpen] = useState(false)
  const [allCards, setAllCards] = useState([])
  const [selectedCardIds, setSelectedCardIds] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!supabase) return undefined

    let mounted = true

    async function loadFeaturedProducts() {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('page', 'home')
        .eq('section', 'featured_product_ids')
        .maybeSingle()

      if (!mounted) return

      if (!error && data?.content) {
        try {
          const parsed = JSON.parse(data.content)
          if (Array.isArray(parsed)) {
            setSelectedCardIds(parsed)
          }
        } catch {
          // Ignore parsing errors
        }
      }
    }

    loadFeaturedProducts()

    return () => {
      mounted = false
    }
  }, [supabase])

  async function loadAllCards() {
    if (!supabase) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .order('page')
        .order('order')

      if (error) throw error

      if (data) {
        setAllCards(
          data.map((card) => ({
            ...card,
            image_url: card.image_urls?.[0] || card.image_url || null,
          })),
        )
      }
    } catch (error) {
      toast.error('Failed to load cards')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function toggleCardSelection(cardId) {
    setSelectedCardIds((prev) => {
      const idStr = String(cardId)
      const prevStr = prev.map(String)
      
      if (prevStr.includes(idStr)) {
        return prev.filter((id) => String(id) !== idStr)
      }
      if (prev.length < 5) {
        return [...prev, cardId]
      }
      toast.error('Maximum 5 featured products allowed')
      return prev
    })
  }

  async function handleSave() {
    if (!supabase) return

    if (selectedCardIds.length === 0) {
      toast.error('Select at least one product to feature')
      return
    }

    try {
      const { error } = await supabase
        .from('site_content')
        .upsert(
          {
            page: 'home',
            section: 'featured_product_ids',
            content: JSON.stringify(selectedCardIds),
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'page,section' },
        )

      if (error) throw error

      toast.success('Featured products updated')
      setOpen(false)
      onFeaturedProductsChange?.()
    } catch (error) {
      toast.error('Failed to save featured products')
      console.error(error)
    }
  }

  if (!isAdmin) {
    return null
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          loadAllCards()
          setOpen(true)
        }}
        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
        title="Manage featured products"
      >
        <FaPencilAlt className="text-sm" />
        Manage Featured
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(event) => event.stopPropagation()}>
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white p-5">
              <h3 className="text-xl font-semibold text-primary-900">
                Featured Products & Services ({selectedCardIds.length}/5)
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close featured products editor"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <p className="text-sm text-gray-600">
                Select up to 5 products or gallery items to feature on the home page. Only selected items will appear.
              </p>

              {loading ? (
                <div className="flex justify-center py-8">
                  <p className="text-gray-600">Loading cards...</p>
                </div>
              ) : allCards.length === 0 ? (
                <div className="rounded-lg bg-gray-50 p-8 text-center">
                  <p className="text-gray-600">No cards available. Create cards in Products or Gallery first.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {allCards.map((card) => (
                    <div key={`${card.page}-${card.id}`} className="flex gap-4 rounded-lg border border-gray-200 p-4 hover:border-primary-400 transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCardIds.includes(card.id)}
                        onChange={() => toggleCardSelection(card.id)}
                        disabled={selectedCardIds.length >= 5 && !selectedCardIds.includes(card.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3">
                          {card.image_url && (
                            <img src={card.image_url} alt={card.title} className="w-20 h-20 object-cover rounded flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-primary-800">{card.title || card.name}</p>
                            <p className="text-sm text-gray-600 mb-1">{card.page.toUpperCase()}</p>
                            <p className="text-sm text-gray-600 truncate">{card.description}</p>
                          </div>
                        </div>
                      </div>
                      {selectedCardIds.includes(card.id) && (
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                            <FaCheck className="text-white text-xs" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="sticky bottom-0 flex justify-end gap-3 border-t border-gray-200 bg-white p-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-gray-200 px-5 py-2 font-semibold text-gray-800 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={loading || selectedCardIds.length === 0}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EditableFeaturedProducts
