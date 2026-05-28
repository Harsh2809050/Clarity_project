'use client'

import { useState, useEffect, useRef } from 'react'
import { SubscribeForm } from '@/components/ui/SubscribeForm'
import { EditableText } from './EditableText'
import { isAdmin, isEditMode, getPageArray, savePageArray } from '@/lib/page-content'

interface Benefit { id: string; icon: string; title: string; description: string }

const BENEFITS_KEY = 'cp_arr_subscribe_benefits_v1'
const DEFAULT_BENEFITS: Benefit[] = [
  { id: 'b0', icon: '📖', title: 'Deep-dive newsletters', description: 'After every conversation: key arguments, frameworks, counterpoints, and ideas you can act on.' },
  { id: 'b1', icon: '🎙️', title: 'Weekly conversations', description: 'One guest per week — a practitioner, reformer, or builder doing the actual work.' },
  { id: 'b2', icon: '🧠', title: 'Ideas worth sharing', description: 'Written for curious, serious readers who want to understand a problem fully before forming an opinion.' },
]
const EMPTY_BENEFIT: Omit<Benefit, 'id'> = { icon: '✨', title: '', description: '' }

export function SubscribeEditor() {
  const [benefits, setBenefits] = useState<Benefit[]>(DEFAULT_BENEFITS)
  const [admin, setAdmin_] = useState(false)
  const [edit, setEdit] = useState(false)
  const [adding, setAdding] = useState(false)
  const [newBenefit, setNewBenefit] = useState(EMPTY_BENEFIT)
  const addFormRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setBenefits(getPageArray<Benefit>(BENEFITS_KEY, DEFAULT_BENEFITS))
    setAdmin_(isAdmin())
    setEdit(isEditMode())
    const h = () => setEdit(isEditMode())
    window.addEventListener('cp_edit_change', h)
    return () => window.removeEventListener('cp_edit_change', h)
  }, [])

  useEffect(() => {
    if (adding) addFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [adding])

  function updateBenefit(id: string, key: keyof Omit<Benefit, 'id'>, val: string) {
    const updated = benefits.map(b => b.id === id ? { ...b, [key]: val } : b)
    setBenefits(updated)
    savePageArray(BENEFITS_KEY, updated)
  }

  function removeBenefit(id: string) {
    const updated = benefits.filter(b => b.id !== id)
    setBenefits(updated)
    savePageArray(BENEFITS_KEY, updated)
  }

  function addBenefit() {
    if (!newBenefit.title.trim()) return
    const item: Benefit = { ...newBenefit, id: `b${Date.now()}` }
    const updated = [...benefits, item]
    setBenefits(updated)
    savePageArray(BENEFITS_KEY, updated)
    setNewBenefit(EMPTY_BENEFIT)
    setAdding(false)
  }

  const inp = 'w-full px-3 py-2 rounded-lg border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark text-sm text-ink dark:text-ink-snow focus:outline-none focus:ring-2 focus:ring-sage/50'
  const editCls = 'outline-none focus:outline-none focus:ring-2 focus:ring-blue-400/60 rounded-sm px-0.5 -mx-0.5 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors cursor-text'

  return (
    <div className="min-h-screen pt-36 pb-24 bg-parchment dark:bg-charcoal">
      <div className="container-editorial">
        <div className="max-w-lg mx-auto">

          {/* Hero */}
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">
              <EditableText page="subscribe" field="eyebrow" fallback="Free Newsletter" />
            </p>
            <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight text-balance mb-5">
              <EditableText page="subscribe" field="headline" fallback="Think deeper about India's future." />
            </h1>
            <p className="body-lg dark:text-ink-snow-muted">
              <EditableText page="subscribe" field="subtitle" fallback="Join 5,000+ educators, policymakers, and founders who read every week." />
            </p>
          </div>

          {/* Subscribe box */}
          <div className="bg-surface dark:bg-surface-dark rounded-2xl border border-rim dark:border-rim-dark p-8 mb-6 shadow-card dark:shadow-card-dark">
            <h2 className="font-serif text-xl font-bold text-ink dark:text-ink-snow mb-1">
              <EditableText page="subscribe" field="box_title" fallback="Subscribe — it takes 10 seconds." />
            </h2>
            <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted mb-6">
              <EditableText page="subscribe" field="box_tagline" fallback="No credit card. No spam. Unsubscribe any time." />
            </p>
            <SubscribeForm size="lg" placeholder="Your email address" buttonLabel="Subscribe Free" utmSource="subscribe_page" />
          </div>

          {/* Benefits list */}
          <div className="space-y-4">
            {benefits.map(b => (
              <div key={b.id} className="relative flex gap-4 p-5 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark group/item">
                {admin && edit && (
                  <button
                    onClick={() => removeBenefit(b.id)}
                    className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 text-xs font-bold opacity-0 group-hover/item:opacity-100 transition-opacity hover:bg-red-200 dark:hover:bg-red-900/50"
                    title="Remove benefit"
                  >×</button>
                )}
                <span className="text-2xl shrink-0 mt-0.5">
                  {admin && edit ? (
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      className={editCls}
                      onBlur={e => updateBenefit(b.id, 'icon', e.currentTarget.textContent ?? b.icon)}
                    >{b.icon}</span>
                  ) : b.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-sans text-sm font-semibold text-ink dark:text-ink-snow mb-1">
                    {admin && edit ? (
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        className={editCls}
                        onBlur={e => updateBenefit(b.id, 'title', e.currentTarget.textContent ?? b.title)}
                      >{b.title}</span>
                    ) : b.title}
                  </h3>
                  <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed">
                    {admin && edit ? (
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        className={editCls}
                        onBlur={e => updateBenefit(b.id, 'description', e.currentTarget.textContent ?? b.description)}
                      >{b.description}</span>
                    ) : b.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Add benefit (edit mode) */}
            {admin && edit && !adding && (
              <button
                onClick={() => setAdding(true)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-sage/40 text-sage dark:text-sage-glow text-sm font-medium hover:border-sage/70 hover:bg-sage/5 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Benefit
              </button>
            )}

            {adding && (
              <div ref={addFormRef} className="p-5 rounded-2xl border-2 border-sage/40 bg-sage/5 dark:bg-sage/[0.06] space-y-3">
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-sage dark:text-sage-glow">New Benefit</p>
                <div className="flex gap-3">
                  <input className={`${inp} w-16 text-center`} value={newBenefit.icon} onChange={e => setNewBenefit(p => ({ ...p, icon: e.target.value }))} placeholder="📖" />
                  <input className={`${inp} flex-1`} value={newBenefit.title} onChange={e => setNewBenefit(p => ({ ...p, title: e.target.value }))} placeholder="Benefit title" />
                </div>
                <textarea className={`${inp} resize-none`} rows={2} value={newBenefit.description} onChange={e => setNewBenefit(p => ({ ...p, description: e.target.value }))} placeholder="Short description..." />
                <div className="flex gap-2">
                  <button onClick={addBenefit} className="px-4 py-2 rounded-lg bg-sage text-white text-xs font-semibold hover:bg-sage-hover transition-all">Add</button>
                  <button onClick={() => { setAdding(false); setNewBenefit(EMPTY_BENEFIT) }} className="px-4 py-2 rounded-lg border border-rim dark:border-rim-dark text-xs text-ink-muted hover:border-sage/30 transition-all">Cancel</button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <p className="font-sans text-xs text-ink-faint dark:text-ink-snow-faint text-center leading-relaxed">
              <EditableText page="subscribe" field="disclaimer" fallback="By subscribing you agree to receive Clarity Project newsletter. We will never share your email." />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
