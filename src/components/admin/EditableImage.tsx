'use client'

import { useState, useEffect, useRef } from 'react'
import NextImage from 'next/image'
import { getField, setField, isAdmin, isEditMode } from '@/lib/page-content'

interface Props {
  page: string
  field: string
  fallback: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  className?: string
  priority?: boolean
}

const MAX_BYTES = 1.5 * 1024 * 1024

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function EditableImage({ page, field, fallback, alt, className, ...imgProps }: Props) {
  const [src,   setSrc]    = useState(fallback)
  const [admin, setAdmin_] = useState(false)
  const [edit,  setEdit]   = useState(false)
  const [error, setError]  = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSrc(getField(page, field, fallback))
    setAdmin_(isAdmin())
    setEdit(isEditMode())
    const h = () => setEdit(isEditMode())
    window.addEventListener('cp_edit_change', h)
    return () => window.removeEventListener('cp_edit_change', h)
  }, [page, field, fallback])

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setError('')
    if (!file.type.startsWith('image/')) { setError('Please pick an image file.'); return }
    if (file.size > MAX_BYTES) { setError('Image must be under 1.5 MB.'); return }
    const dataUrl = await fileToDataURL(file)
    setField(page, field, dataUrl)
    setSrc(dataUrl)
  }

  const isDataUrl = src.startsWith('data:')

  if (!admin || !edit) {
    return <NextImage src={src} alt={alt} className={className} unoptimized={isDataUrl} {...imgProps} />
  }

  return (
    <div className="relative group/img cursor-pointer" onClick={() => fileRef.current?.click()} title="Click to change image">
      <NextImage src={src} alt={alt} className={className} unoptimized={isDataUrl} {...imgProps} />
      <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
        <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg">
          Click to change image
        </span>
      </div>
      {error && (
        <div className="absolute bottom-2 left-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-lg text-center">
          {error}
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  )
}
