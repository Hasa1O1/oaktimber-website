import React, { useEffect, useState } from 'react'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import useAdminMode from '../hooks/useAdminMode'

function EditableText({ page, section, defaultValue, multiline = false }) {
  const { isAdmin, supabase } = useAdminMode()
  const fallbackValue = typeof defaultValue === 'string' ? defaultValue : String(defaultValue ?? '')
  const [value, setValue] = useState(null)
  const [draft, setDraft] = useState(null)
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!supabase) return undefined

    let mounted = true

    async function loadContent() {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('page', page)
        .eq('section', section)
        .maybeSingle()

      if (!mounted) return

      if (!error && typeof data?.content === 'string' && data.content.trim() !== '') {
        setValue(data.content)
        setDraft(data.content)
      } else {
        // Only use fallback if database is empty
        setValue(fallbackValue)
        setDraft(fallbackValue)
      }
      setLoaded(true)
    }

    loadContent()

    return () => {
      mounted = false
    }
  }, [page, section, supabase, fallbackValue])

  async function handleSave() {
    if (!supabase) return

    const { error } = await supabase
      .from('site_content')
      .upsert(
        {
          page,
          section,
          content: draft,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'page,section' },
      )

    if (error) {
      toast.error(error.message)
      return
    }

    setValue(draft)
    setOpen(false)
    toast.success('Text updated')
  }

  if (!loaded) {
    return null
  }

  if (!isAdmin) {
    return <>{value}</>
  }

  return (
    <>
      <span className="relative inline-flex items-center gap-2">
        <span>{value}</span>
        <button
          type="button"
          onClick={() => {
            setDraft(value)
            setOpen(true)
          }}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-white shadow-md hover:bg-primary-700"
          aria-label={`Edit ${section}`}
        >
          <FaPencilAlt className="text-xs" />
        </button>
      </span>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <h3 className="text-xl font-semibold text-primary-900">Edit Text</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close text editor"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-5">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {page}.{section}
              </label>
              {multiline ? (
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  rows="7"
                  className="w-full rounded-lg border border-primary-200 px-4 py-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                />
              ) : (
                <input
                  type="text"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  className="w-full rounded-lg border border-primary-200 px-4 py-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                />
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 p-5">
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
                className="btn-primary"
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

export default EditableText

