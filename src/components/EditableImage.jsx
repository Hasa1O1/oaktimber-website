import React, { useEffect, useState } from 'react'
import { FaPencilAlt, FaTimes, FaUpload, FaTrash } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import useAdminMode from '../hooks/useAdminMode'

function EditableImage({ page, section, defaultValue, alt = '' }) {
  const { isAdmin, supabase } = useAdminMode()
  const [imageUrl, setImageUrl] = useState(null)
  const [draft, setDraft] = useState(null)
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
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
        setImageUrl(data.content)
        setDraft(data.content)
      } else {
        // Only use fallback if database is empty
        setImageUrl(defaultValue)
        setDraft(defaultValue)
      }
      setLoaded(true)
    }

    loadContent()

    return () => {
      mounted = false
    }
  }, [page, section, supabase, defaultValue])

  async function handleUpload(event) {
    const file = event.target.files?.[0]
    if (!file || !supabase) return

    setUploading(true)
    try {
      const extension = file.name.split('.').pop()
      const filePath = `site-images/${page}/${section}/${crypto.randomUUID()}.${extension}`

      const { error } = await supabase.storage
        .from('card-images')
        .upload(filePath, file, { upsert: true })

      if (error) {
        toast.error(error.message)
        setUploading(false)
        return
      }

      const { data } = supabase.storage
        .from('card-images')
        .getPublicUrl(filePath)

      setDraft(data.publicUrl)
      toast.success('Image uploaded')
    } catch (error) {
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

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

    setImageUrl(draft)
    setOpen(false)
    toast.success('Image updated')
  }

  if (!loaded) {
    return null
  }

  if (!isAdmin) {
    return (
      <div className="relative inline-block w-full">
        <img src={imageUrl} alt={alt} className="w-full aspect-square object-cover rounded-2xl shadow-xl" />
      </div>
    )
  }

  return (
    <>
      <div className="relative inline-block w-full">
        <img src={imageUrl} alt={alt} className="w-full aspect-square object-cover rounded-2xl shadow-xl" />
        <button
          type="button"
          onClick={() => {
            setDraft(imageUrl)
            setOpen(true)
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700"
          aria-label="Edit image"
        >
          <FaPencilAlt className="text-sm" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <h3 className="text-xl font-semibold text-primary-900">Edit Image</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close image editor"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {page}.{section}
                </label>
                {draft && (
                  <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
                    <img src={draft} alt={alt} className="w-full h-64 object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Upload New Image</label>
                <label className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-primary-300 p-6 hover:border-primary-500 transition-colors">
                  <div className="text-center">
                    <FaUpload className="mx-auto mb-2 text-2xl text-primary-600" />
                    <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>

              {draft && draft !== imageUrl && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Or enter image URL manually</label>
                  <input
                    type="text"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-lg border border-primary-200 px-4 py-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  />
                </div>
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
                disabled={uploading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EditableImage
