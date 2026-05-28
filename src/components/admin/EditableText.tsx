'use client'

import { useState, useEffect } from 'react'
import { getField, setField, isAdmin, isEditMode } from '@/lib/page-content'

interface Props {
  page: string
  field: string
  fallback: string
  className?: string
  as?: keyof React.JSX.IntrinsicElements
}

export function EditableText({ page, field, fallback, className = '', as: Tag = 'span' }: Props) {
  const [val,    setVal]    = useState(fallback)
  const [admin,  setAdmin_] = useState(false)
  const [edit,   setEdit]   = useState(false)

  useEffect(() => {
    setVal(getField(page, field, fallback))
    setAdmin_(isAdmin())
    setEdit(isEditMode())
    const h = () => setEdit(isEditMode())
    window.addEventListener('cp_edit_change', h)
    return () => window.removeEventListener('cp_edit_change', h)
  }, [page, field, fallback])

  if (!admin || !edit) {
    return <Tag className={className}>{val}</Tag>
  }

  return (
    <Tag
      className={`${className} outline outline-2 outline-blue-400/60 outline-offset-2 rounded-sm cursor-text hover:outline-blue-500 transition-all`}
      contentEditable
      suppressContentEditableWarning
      onBlur={e => {
        const newVal = e.currentTarget.textContent ?? ''
        setField(page, field, newVal)
        setVal(newVal)
      }}
      spellCheck={false}
      title="Click to edit"
    >
      {val}
    </Tag>
  )
}
