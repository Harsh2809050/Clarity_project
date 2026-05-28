'use client'

import { useState, useEffect } from 'react'
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

export function EditableImage({ page, field, fallback, alt, className, ...imgProps }: Props) {
  const [src,   setSrc]   = useState(fallback)
  const [admin, setAdmin_] = useState(false)
  const [edit,  setEdit]  = useState(false)

  useEffect(() => {
    setSrc(getField(page, field, fallback))
    setAdmin_(isAdmin())
    setEdit(isEditMode())
    const h = () => setEdit(isEditMode())
    window.addEventListener('cp_edit_change', h)
    return () => window.removeEventListener('cp_edit_change', h)
  }, [page, field, fallback])

  function changeImage() {
    const url = window.prompt('Enter new image URL:', src)
    if (url && url.trim()) {
      setField(page, field, url.trim())
      setSrc(url.trim())
    }
  }

  if (!admin || !edit) {
    return <NextImage src={src} alt={alt} className={className} {...imgProps} />
  }

  return (
    <div className="relative group/img cursor-pointer" onClick={changeImage} title="Click to change image">
      <NextImage src={src} alt={alt} className={className} {...imgProps} />
      <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
        <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg">
          Click to change image
        </span>
      </div>
    </div>
  )
}
