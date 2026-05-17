import React, { useEffect, useState } from 'react'
import { FaImage, FaPlus, FaTimes, FaTrash, FaUpload } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import useAdminMode from '../hooks/useAdminMode'

const emptyForm = {
  title: '',
  description: '',
  category: '',
  features: [''],
  image_url: '',
}

function CardModal({ card, page, isOpen, onClose, onSave }) {
  const { supabase } = useAdminMode()
  const [formData, setFormData] = useState(emptyForm)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    setFormData({
      title: card?.title || card?.name || '',
      description: card?.description || '',
      category: card?.category || '',
      features: Array.isArray(card?.features) && card.features.length ? card.features : [''],
      image_url: card?.image_url || card?.images?.[0] || '',
    })
  }, [card, isOpen])

  if (!isOpen) return null

  function updateFeature(index, value) {
    setFormData((current) => ({
      ...current,
      features: current.features.map((feature, featureIndex) => (
        featureIndex === index ? value : feature
      )),
    }))
  }

  function addFeature() {
    setFormData((current) => ({
      ...current,
      features: [...current.features, ''],
    }))
  }

  function removeFeature(index) {
    setFormData((current) => ({
      ...current,
      features: current.features.filter((_feature, featureIndex) => featureIndex !== index),
    }))
  }

  async function handleUpload(event) {
    const file = event.target.files?.[0]
    if (!file || !supabase) return

    setUploading(true)
    const extension = file.name.split('.').pop()
    const filePath = `${page}/${crypto.randomUUID()}.${extension}`
    const { error } = await supabase.storage
      .from('card-images')
      .upload(filePath, file, { upsert: false })

    if (error) {
      toast.error(error.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage
      .from('card-images')
      .getPublicUrl(filePath)

    setFormData((current) => ({
      ...current,
      image_url: data.publicUrl,
    }))
    setUploading(false)
    toast.success('Image uploaded')
  }

  async function handleRemoveImage() {
    setFormData((current) => ({
      ...current,
      image_url: '',
    }))
    toast.success('Image removed from card')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setSaving(true)
    try {
      await onSave({
        ...formData,
        image_url: formData.image_url || null,
        features: formData.features.map((feature) => feature.trim()).filter(Boolean),
      })

      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        className="flex max-h-[95vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <h3 className="text-xl font-semibold text-primary-900">
            {card ? 'Edit Card' : 'Create Card'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close card modal"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Title / Name</label>
            <input
              type="text"
              value={formData.title}
              onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))}
              required
              className="w-full rounded-lg border border-primary-200 px-4 py-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Details / Paragraph Text</label>
            <textarea
              value={formData.description}
              onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))}
              rows="4"
              className="w-full rounded-lg border border-primary-200 px-4 py-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            />
          </div>

          {page === 'products' && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
              <select
                value={formData.category}
                onChange={(event) => setFormData((current) => ({ ...current, category: event.target.value }))}
                className="w-full rounded-lg border border-primary-200 px-4 py-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
              >
                <option value="">Choose category</option>
                <option value="furniture">Furniture</option>
                <option value="installations">Installations</option>
                <option value="services">Services</option>
              </select>
            </div>
          )}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Features / List Text</label>
              <button
                type="button"
                onClick={addFeature}
                className="inline-flex items-center gap-2 rounded-lg bg-primary-100 px-3 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-200"
              >
                <FaPlus className="text-xs" />
                Add
              </button>
            </div>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(event) => updateFeature(index, event.target.value)}
                    className="w-full rounded-lg border border-primary-200 px-4 py-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="rounded-lg bg-red-100 px-3 text-red-700 hover:bg-red-200"
                    aria-label="Remove feature"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Picture</label>
            <label className="flex cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-dashed border-primary-200 bg-primary-50 px-4 py-6 text-primary-700 transition-colors hover:bg-primary-100">
              <FaUpload />
              <span className="font-semibold">{formData.image_url ? 'Upload Replacement Picture' : 'Upload Picture'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
            {uploading && <p className="mt-2 text-sm text-gray-600">Uploading...</p>}
            {formData.image_url && (
              <div className="mt-4 rounded-lg border border-gray-200 bg-white p-3">
                <img
                  src={formData.image_url}
                  alt="Card preview"
                  className="h-48 w-full rounded-lg bg-gray-100 object-contain"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-700 hover:bg-red-200"
                >
                  <FaTrash className="text-sm" />
                  Delete Picture
                </button>
              </div>
            )}
            {!formData.image_url && (
              <div className="mt-4 flex h-32 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                <div className="text-center">
                  <FaImage className="mx-auto mb-2 text-2xl" />
                  <p className="text-sm">No picture selected</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-5 py-2 font-semibold text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button type="submit" disabled={saving || uploading} className="btn-primary disabled:opacity-60">
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CardModal
