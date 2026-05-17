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

function normalizeCard(card) {
  return {
    ...card,
    name: card.title,
    images: card.image_url ? [card.image_url] : [],
    features: normalizeFeatures(card.features),
    order: Number.isFinite(card.order) ? card.order : 0,
  }
}

export function useCards(page, fallbackCards = []) {
  const { supabase, isSupabaseConfigured } = useAdminMode()
  const [cards, setCards] = useState(fallbackCards)
  const [loading, setLoading] = useState(isSupabaseConfigured)

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
  }, [fallback, page, supabase])

  async function createCard(input) {
    if (!supabase) return

    const maxOrder = cards.reduce((max, card) => Math.max(max, card.order ?? 0), 0)
    const { error } = await supabase.from('cards').insert({
      page,
      title: input.title,
      description: input.description,
      features: input.features,
      image_url: input.image_url,
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
        image_url: input.image_url,
        category: input.category || null,
      })
      .eq('id', id)

    if (error) throw error
    toast.success('Card updated')
  }

  async function deleteCard(id) {
    if (!supabase) return

    if (typeof id !== 'string') {
      setCards((current) => current.filter((card) => card.id !== id))
      toast.success('Default card hidden for this session')
      return
    }

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
