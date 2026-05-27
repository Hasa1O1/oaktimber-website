import { useEffect, useState } from 'react'
import useAdminMode from './useAdminMode'

function useSiteContent(page, section, defaultValue = '') {
  const { supabase } = useAdminMode()
  const [value, setValue] = useState(defaultValue)

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

    return () => {
      mounted = false
    }
  }, [page, section, supabase])

  return value
}

export default useSiteContent

