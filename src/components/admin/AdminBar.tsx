'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { isAdmin, isEditMode, toggleEditMode, setAdminFlag } from '@/lib/page-content'

export function AdminBar() {
  const [show,    setShow]    = useState(false)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setShow(isAdmin())
    setEditing(isEditMode())
    const h = () => setEditing(isEditMode())
    window.addEventListener('cp_edit_change', h)
    return () => window.removeEventListener('cp_edit_change', h)
  }, [])

  if (!show) return null

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAdminFlag(false)
    if (editing) toggleEditMode()
    window.location.href = '/'
  }

  return (
    <div className={`fixed bottom-0 inset-x-0 z-[9999] flex items-center justify-between px-5 py-2.5 text-white text-sm border-t transition-colors ${editing ? 'bg-blue-700 border-blue-600' : 'bg-gray-900 border-gray-700'}`}>

      <div className="flex items-center gap-4">
        <span className="font-semibold text-xs uppercase tracking-wider text-green-400">Admin</span>

        <button
          onClick={() => { toggleEditMode(); setEditing(isEditMode()) }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${editing ? 'bg-white text-blue-700' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          {editing ? 'Editing — click any text to edit' : 'Enable Edit Mode'}
        </button>

        {editing && (
          <span className="text-blue-200 text-xs hidden sm:block">
            Click text to edit · Click image to change · Changes save instantly
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Link href="/admin" className="text-gray-300 hover:text-white text-xs transition-colors">
          Admin Panel →
        </Link>
        <button onClick={logout} className="text-gray-400 hover:text-red-400 text-xs transition-colors">
          Logout
        </button>
      </div>
    </div>
  )
}
