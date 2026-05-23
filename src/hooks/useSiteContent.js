import { useEffect, useMemo, useState } from 'react'
import useAdminMode from './useAdminMode'

function useSiteContent(page, section, defaultValue = '') {
  const { supabase } = useAdminMode()
  const [value, setValue] = useState(defaultValue)

  const channelName = useMemo(() => `site_content_value:${page}:${section}`, [page, section])

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (!supabase) return undefined

    let mounted = true

    async function loadValue() {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('page', page)
        .eq('section', section)
        .maybeSingle()

      if (!mounted) return

      if (!error && typeof data?.content === 'string' && data.content.trim() !== '') {
        setValue(data.content)
      }
    }

    loadValue()

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_content', filter: `page=eq.${page}` },
        (payload) => {
          if (
            payload.new?.section === section &&
            typeof payload.new.content === 'string' &&
            payload.new.content.trim() !== ''
          ) {
            setValue(payload.new.content)
          }
        },
      )
      .subscribe()

    return () => {
      mounted = false
      supabase.removeChannel(channel)
    }
  }, [channelName, page, section, supabase])

  return value
}

export default useSiteContent

