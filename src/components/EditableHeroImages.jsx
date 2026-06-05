import React, { useEffect, useState } from 'react'
import { FaPencilAlt, FaTimes, FaUpload, FaTrash, FaChevronUp, FaChevronDown, FaPlus } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import useAdminMode from '../hooks/useAdminMode'

function EditableHeroImages({ page, section, defaultImages = [] }) {
  const { isAdmin, supabase } = useAdminMode()
  const [images, setImages] = useState(null)
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

      if (!error && data?.content) {
        try {
          const parsed = JSON.parse(data.content)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setImages(parsed)
            setDraft(parsed)
            setLoaded(true)
            return
          }
        } catch {
          // Fall back to default if JSON parsing fails
        }
      }
      // Only use fallback if database is empty
      setImages(defaultImages)
      setDraft(defaultImages)
      setLoaded(true)
    }

    loadContent()

    return () => {
      mounted = false
    }
  }, [page, section, supabase, defaultImages])

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

      setDraft((prev) => [...prev, data.publicUrl])
      toast.success('Image added')
    } catch (error) {
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  function moveImage(index, direction) {
    const newDraft = [...draft]
    if (direction === 'up' && index > 0) {
      [newDraft[index], newDraft[index - 1]] = [newDraft[index - 1], newDraft[index]]
    } else if (direction === 'down' && index < newDraft.length - 1) {
      [newDraft[index], newDraft[index + 1]] = [newDraft[index + 1], newDraft[index]]
    }
    setDraft(newDraft)
  }

  function removeImage(index) {
    setDraft((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSave() {
    if (!supabase || draft.length === 0) {
      toast.error('At least one image is required')
      return
    }

    const { error } = await supabase
      .from('site_content')
      .upsert(
        {
          page,
          section,
          content: JSON.stringify(draft),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'page,section' },
      )

    if (error) {
      toast.error(error.message)
      return
    }

    setImages(draft)
    setOpen(false)
    toast.success('Hero images updated')
  }

  if (!loaded) {
    return null
  }

  if (!isAdmin) {
    return null
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setDraft(images)
          setOpen(true)
        }}
        className="fixed bottom-8 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 z-40"
        aria-label="Edit hero images"
        title="Edit hero images"
      >
        <FaPencilAlt />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(event) => event.stopPropagation()}>
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white p-5">
              <h3 className="text-xl font-semibold text-primary-900">Edit Hero Images</h3>
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
                <label className="mb-3 block text-sm font-medium text-gray-700">Hero Images ({draft.length})</label>
                <div className="space-y-3">
                  {draft.map((imageUrl, index) => (
                    <div key={index} className="flex gap-3 items-start bg-gray-50 p-3 rounded-lg">
                      <img src={imageUrl} alt={`Hero ${index + 1}`} className="w-24 h-24 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-600 break-all">{imageUrl}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => moveImage(index, 'up')}
                          disabled={index === 0}
                          className="p-2 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                          title="Move up"
                        >
                          <FaChevronUp className="text-sm" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImage(index, 'down')}
                          disabled={index === draft.length - 1}
                          className="p-2 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                          title="Move down"
                        >
                          <FaChevronDown className="text-sm" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded"
                          title="Remove image"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-5">
                <label className="mb-3 block text-sm font-medium text-gray-700">Add More Images</label>
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
                disabled={uploading || draft.length === 0}
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

export default EditableHeroImages
