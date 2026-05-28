'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'

interface Props {
  value: string
  onChange: (url: string) => void
  label?: string
}

const MAX_BYTES = 1.5 * 1024 * 1024 // 1.5 MB raw file limit

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function ImageUploadField({ value, onChange, label = 'Thumbnail' }: Props) {
  const fileRef  = useRef<HTMLInputElement>(null)
  const [mode,   setMode]   = useState<'upload' | 'url'>('upload')
  const [urlVal, setUrlVal] = useState(value.startsWith('data:') ? '' : value)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')

  const inp  = 'w-full px-3 py-2 rounded-lg border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark text-sm text-ink dark:text-ink-snow focus:outline-none focus:ring-2 focus:ring-sage/50'
  const lbl  = 'block font-sans text-[11px] font-semibold uppercase tracking-wider text-ink-faint dark:text-ink-snow-faint mb-1'

  async function handleFile(file: File) {
    setError('')
    if (!file.type.startsWith('image/')) { setError('Please pick an image file.'); return }
    if (file.size > MAX_BYTES) { setError('Image must be under 1.5 MB.'); return }
    const dataUrl = await fileToDataURL(file)
    onChange(dataUrl)
  }

  const onInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) await handleFile(file)
    e.target.value = ''
  }, [])

  const onDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) await handleFile(file)
  }, [])

  const previewSrc = value || null
  const isDataUrl  = value.startsWith('data:')

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className={lbl}>{label}</label>
        <div className="flex items-center gap-1 text-[11px]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded-md font-medium transition-colors ${mode === 'upload' ? 'bg-sage text-white' : 'text-ink-muted dark:text-ink-snow-muted hover:text-sage'}`}
          >Upload</button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded-md font-medium transition-colors ${mode === 'url' ? 'bg-sage text-white' : 'text-ink-muted dark:text-ink-snow-muted hover:text-sage'}`}
          >URL</button>
        </div>
      </div>

      {mode === 'url' ? (
        <input
          className={inp}
          value={urlVal}
          placeholder="/thumbnails/... or https://..."
          onChange={e => { setUrlVal(e.target.value); onChange(e.target.value) }}
        />
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden
            ${dragging ? 'border-sage bg-sage/10' : 'border-rim dark:border-rim-dark hover:border-sage/60 hover:bg-sage/5'}`}
        >
          {previewSrc ? (
            <div className="relative aspect-[16/9]">
              <Image
                src={previewSrc}
                alt="thumbnail preview"
                fill
                sizes="480px"
                className="object-contain"
                unoptimized={isDataUrl}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-ink text-xs font-semibold px-3 py-1.5 rounded-lg">Replace image</span>
              </div>
            </div>
          ) : (
            <div className="py-8 flex flex-col items-center gap-2 text-ink-faint dark:text-ink-snow-faint">
              <svg className="w-8 h-8 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <p className="font-sans text-xs font-medium">Drop image here or click to browse</p>
              <p className="font-sans text-[11px] opacity-70">JPG, PNG, WebP — max 1.5 MB</p>
            </div>
          )}
        </div>
      )}

      {error && <p className="font-sans text-[11px] text-red-500">{error}</p>}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onInputChange}
      />
    </div>
  )
}
