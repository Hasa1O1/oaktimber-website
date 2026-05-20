import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import useAdminMode from './useAdminMode'

function normalizeFeatures(features) {
  if (Array.isArray(features)) return features
  if (!features) return []

  if (typeof features === 'string') {
    try {
      const parsed = JSON.parse(features)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return features.split('\n').map((item) => item.trim()).filter(Boolean)
    }
  }

  return []
}

function normalizeImages(card) {
  if (Array.isArray(card.image_urls) && card.image_urls.length) {
    return card.image_urls.filter(Boolean)
  }

  if (typeof card.image_urls === 'string') {
    try {
      const parsed = JSON.parse(card.image_urls)
      if (Array.isArray(parsed) && parsed.length) {
        return parsed.filter(Boolean)
      }
    } catch {
      return []
    }
  }

  if (card.image_url) return [card.image_url]
  if (Array.isArray(card.images)) return card.images.filter(Boolean)
  return []
}

function normalizeCard(card) {
  const images = normalizeImages(card)

  return {
    ...card,
    name: card.title,
    image_url: images[0] || null,
    image_urls: images,
    images,
    features: normalizeFeatures(card.features),
    order: Number.isFinite(card.order) ? card.order : 0,
  }
}

export function useCards(page, fallbackCards = []) {
  const { supabase, isSupabaseConfigured, isAdmin } = useAdminMode()
  const [cards, setCards] = useState(fallbackCards)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [hasSeededDefaults, setHasSeededDefaults] = useState(false)

  const fallback = useMemo(() => fallbackCards, [fallbackCards])

  useEffect(() => {
    if (!supabase) {
      setCards(fallback)
      setLoading(false)
      return undefined
    }

    let mounted = true

    async function loadCards() {
      setLoading(true)
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('page', page)
        .order('order', { ascending: true })

      if (!mounted) return

      if (error) {
        console.error(error)
        setCards(fallback)
        setLoading(false)
        return
      }

      if (!data.length && isAdmin && fallback.length && !hasSeededDefaults) {
        setHasSeededDefaults(true)
        const rows = fallback.map((card, index) => ({
          page,
          category: card.category || null,
          title: card.title || card.name,
          description: card.description || '',
          features: card.features || [],
          image_url: card.image_url || card.images?.[0] || null,
          image_urls: card.images?.length ? card.images : card.image_url ? [card.image_url] : [],
          order: card.order || index + 1,
        }))

        const { data: inserted, error: insertError } = await supabase
          .from('cards')
          .insert(rows)
          .select('*')

        if (!mounted) return

        if (insertError) {
          console.error(insertError)
          setCards(fallback)
          setLoading(false)
          return
        }

        setCards(inserted.map(normalizeCard))
        setLoading(false)
        return
      }

      setCards(data.length ? data.map(normalizeCard) : fallback)
      setLoading(false)
    }

    loadCards()

    const channel = supabase
      .channel(`cards:${page}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'cards', filter: `page=eq.${page}` },
        loadCards,
      )
      .subscribe()

    return () => {
      mounted = false
      supabase.removeChannel(channel)
    }
  }, [fallback, hasSeededDefaults, isAdmin, page, supabase])

  async function createCard(input) {
    if (!supabase) return

    const maxOrder = cards.reduce((max, card) => Math.max(max, card.order ?? 0), 0)
    const { error } = await supabase.from('cards').insert({
      page,
      title: input.title,
      description: input.description,
      features: input.features,
      image_url: input.image_urls?.[0] || input.image_url || null,
      image_urls: input.image_urls || [],
      category: input.category || null,
      order: maxOrder + 1,
    })

    if (error) throw error
    toast.success('Card created')
  }

  async function updateCard(id, input) {
    if (!supabase) return

    if (typeof id !== 'string') {
      await createCard(input)
      return
    }

    const { error } = await supabase
      .from('cards')
      .update({
        title: input.title,
        description: input.description,
        features: input.features,
        image_url: input.image_urls?.[0] || input.image_url || null,
        image_urls: input.image_urls || [],
        category: input.category || null,
      })
      .eq('id', id)

    if (error) throw error
    toast.success('Card updated')
  }

  async function deleteCard(id) {
    if (!supabase) return

    const { error } = await supabase
      .from('cards')
      .delete()
      .eq('id', id)

    if (error) throw error
    toast.success('Card deleted')
  }

  return {
    cards,
    loading,
    createCard,
    updateCard,
    deleteCard,
  }
}
