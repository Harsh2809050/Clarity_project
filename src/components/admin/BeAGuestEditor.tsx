'use client'

import { useState, useEffect, useRef } from 'react'
import { SubscribeCTA } from '@/components/home/SubscribeCTA'
import { EditableText } from './EditableText'
import { isAdmin, isEditMode, getPageArray, savePageArray } from '@/lib/page-content'

interface GuestType  { id: string; icon: string; label: string; description: string }
interface ExpectStep { id: string; step: string; title: string; body: string }
interface FAQ        { id: string; q: string; a: string }

const GTYPES_KEY  = 'cp_arr_guest_types_v1'
const EXPECT_KEY  = 'cp_arr_expect_v1'
const FAQS_KEY    = 'cp_arr_faqs_v1'

const DEFAULT_GTYPES: GuestType[] = [
  { id: 'g0', icon: '🏫', label: 'School & Institution Leaders', description: 'Principals, school chains, university leaders driving curriculum or structural change.' },
  { id: 'g1', icon: '📜', label: 'Policy Architects', description: 'Bureaucrats, advisors, and researchers shaping education and enterprise policy in India.' },
  { id: 'g2', icon: '🚀', label: 'Founders & Operators', description: 'Builders solving real problems in EdTech, skill development, or related sectors.' },
  { id: 'g3', icon: '🔬', label: 'Researchers & Thinkers', description: 'Academics and independent researchers with grounded, evidence-based perspectives.' },
]
const DEFAULT_EXPECT: ExpectStep[] = [
  { id: 'e0', step: '01', title: 'A real conversation', body: 'Not a PR interview. We read your work, study your organisation, and come prepared with specific questions about your thinking — the decisions, the mistakes, the things you\'d do differently.' },
  { id: 'e1', step: '02', title: 'Deep audience, not wide', body: '5,000+ educators, policymakers, founders, and researchers in India. People who read the long version because they care about the problem — not casual scrollers.' },
  { id: 'e2', step: '03', title: 'A newsletter that does the work justice', body: 'After every conversation, we write a long-form newsletter — key frameworks, debates, concrete ideas — that reaches our full subscriber base. Your ideas live beyond the episode.' },
  { id: 'e3', step: '04', title: 'Your time is respected', body: 'Recording takes 60–75 minutes, done remotely at your convenience. We send questions in advance. No performance required — just an honest exchange.' },
]
const DEFAULT_FAQS: FAQ[] = [
  { id: 'f0', q: 'How long is a typical recording?', a: '60 to 75 minutes over video call (Zoom or Google Meet). We send the questions beforehand so you can think — not memorise answers, just orient yourself.' },
  { id: 'f1', q: 'Will I be able to review the episode before it goes live?', a: 'Yes. We share a draft of the newsletter and the episode title / description for your review. We don\'t do surprise edits.' },
  { id: 'f2', q: 'Is this a paid appearance?', a: 'No — and we don\'t accept payment to feature guests either. Every guest appears because the conversation is worth having.' },
  { id: 'f3', q: 'What if I\'m not comfortable on camera?', a: 'The primary output is the newsletter — audio-only is fine. Many of our best conversations have been voice-only. Your ideas are the product, not your face.' },
  { id: 'f4', q: 'How far out are you booking?', a: 'We typically book 4–6 weeks ahead. Reach out and we\'ll find a slot that works.' },
]

function EditableField({ value, onSave, className = '', multiline = false }: {
  value: string; onSave: (v: string) => void; className?: string; multiline?: boolean
}) {
  const cls = `${className} outline-none focus:ring-2 focus:ring-blue-400/60 rounded-sm px-0.5 -mx-0.5 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors cursor-text`
  return (
    <span
      contentEditable
      suppressContentEditableWarning
      className={cls}
      style={multiline ? { whiteSpace: 'pre-wrap' } : undefined}
      onBlur={e => onSave(e.currentTarget.textContent ?? value)}
    >
      {value}
    </span>
  )
}

function AddForm({ fields, onAdd, onCancel }: {
  fields: { key: string; placeholder: string; multiline?: boolean }[]
  onAdd: (vals: Record<string, string>) => void
  onCancel: () => void
}) {
  const [vals, setVals] = useState<Record<string, string>>(Object.fromEntries(fields.map(f => [f.key, ''])))
  const inp = 'w-full px-3 py-2 rounded-lg border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark text-sm text-ink dark:text-ink-snow focus:outline-none focus:ring-2 focus:ring-sage/50'
  return (
    <div className="p-4 rounded-2xl border-2 border-sage/40 bg-sage/5 dark:bg-sage/[0.06] space-y-3">
      {fields.map(f => f.multiline ? (
        <textarea key={f.key} className={`${inp} resize-none`} rows={2} placeholder={f.placeholder}
          value={vals[f.key]} onChange={e => setVals(p => ({ ...p, [f.key]: e.target.value }))} />
      ) : (
        <input key={f.key} className={inp} placeholder={f.placeholder}
          value={vals[f.key]} onChange={e => setVals(p => ({ ...p, [f.key]: e.target.value }))} />
      ))}
      <div className="flex gap-2">
        <button onClick={() => { if (Object.values(vals).some(v => v.trim())) onAdd(vals) }}
          className="px-4 py-2 rounded-lg bg-sage text-white text-xs font-semibold hover:bg-sage-hover transition-all">Add</button>
        <button onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-rim dark:border-rim-dark text-xs text-ink-muted hover:border-sage/30 transition-all">Cancel</button>
      </div>
    </div>
  )
}

function AddRowBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-sage/40 text-sage dark:text-sage-glow text-sm font-medium hover:border-sage/70 hover:bg-sage/5 transition-all">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      {label}
    </button>
  )
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 text-xs font-bold opacity-0 group-hover/item:opacity-100 transition-opacity hover:bg-red-200 dark:hover:bg-red-900/50"
      title="Remove">×</button>
  )
}

export function BeAGuestEditor() {
  const [guestTypes,  setGuestTypes]  = useState<GuestType[]>(DEFAULT_GTYPES)
  const [expectSteps, setExpectSteps] = useState<ExpectStep[]>(DEFAULT_EXPECT)
  const [faqs,        setFaqs]        = useState<FAQ[]>(DEFAULT_FAQS)
  const [admin, setAdmin_] = useState(false)
  const [edit,  setEdit]   = useState(false)
  const [addingG, setAddingG] = useState(false)
  const [addingE, setAddingE] = useState(false)
  const [addingF, setAddingF] = useState(false)

  useEffect(() => {
    setGuestTypes(getPageArray<GuestType>(GTYPES_KEY, DEFAULT_GTYPES))
    setExpectSteps(getPageArray<ExpectStep>(EXPECT_KEY, DEFAULT_EXPECT))
    setFaqs(getPageArray<FAQ>(FAQS_KEY, DEFAULT_FAQS))
    setAdmin_(isAdmin())
    setEdit(isEditMode())
    const h = () => setEdit(isEditMode())
    window.addEventListener('cp_edit_change', h)
    return () => window.removeEventListener('cp_edit_change', h)
  }, [])

  const updateG = (id: string, k: keyof Omit<GuestType,  'id'>, v: string) => { const u = guestTypes.map(x => x.id===id?{...x,[k]:v}:x); setGuestTypes(u); savePageArray(GTYPES_KEY,u) }
  const updateE = (id: string, k: keyof Omit<ExpectStep,'id'>, v: string) => { const u = expectSteps.map(x => x.id===id?{...x,[k]:v}:x); setExpectSteps(u); savePageArray(EXPECT_KEY,u) }
  const updateF = (id: string, k: keyof Omit<FAQ,       'id'>, v: string) => { const u = faqs.map(x => x.id===id?{...x,[k]:v}:x); setFaqs(u); savePageArray(FAQS_KEY,u) }
  const removeG = (id: string) => { const u = guestTypes.filter(x=>x.id!==id); setGuestTypes(u); savePageArray(GTYPES_KEY,u) }
  const removeE = (id: string) => { const u = expectSteps.filter(x=>x.id!==id); setExpectSteps(u); savePageArray(EXPECT_KEY,u) }
  const removeF = (id: string) => { const u = faqs.filter(x=>x.id!==id); setFaqs(u); savePageArray(FAQS_KEY,u) }

  const EF = admin && edit ? EditableField : null

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <div className="max-w-2xl">
            <p className="eyebrow mb-6">
              <EditableText page="guest" field="hero_eyebrow" fallback="Be a Guest" />
            </p>
            <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight text-balance mb-7">
              <EditableText page="guest" field="hero_h1" fallback="Your work deserves a real conversation." />
            </h1>
            <p className="body-lg mb-5 dark:!text-ink-snow-muted">
              <EditableText page="guest" field="hero_body1" fallback="Clarity Project is a weekly long-form conversation with the educators, policymakers, founders, and researchers reshaping India's systems. If you have something important to say about education, policy, or entrepreneurship — we want to hear it." />
            </p>
            <p className="body-lg mb-10 dark:!text-ink-snow-muted">
              <EditableText page="guest" field="hero_body2" fallback="We keep it substantive, we do our homework, and we write a newsletter that gives your ideas a life beyond the episode. No fluff, no filler." />
            </p>
            <a
              href="mailto:office@theclarityproject.in?subject=Guest%20Application%20—%20The%20Clarity%20Project"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold bg-sage text-white px-6 py-3.5 rounded-xl hover:bg-sage-hover transition-all duration-200 shadow-sm"
            >
              <EditableText page="guest" field="cta_label" fallback="Apply to be a guest" />
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </div>
      </section>

      <div className="container-editorial"><div className="border-t border-rim dark:border-rim-dark" /></div>

      {/* ── Who We Talk To ───────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <div className="mb-12">
            <p className="eyebrow mb-3">
              <EditableText page="guest" field="who_eyebrow" fallback="Who We Talk To" />
            </p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight">
              <EditableText page="guest" field="who_h2" fallback="The people shaping what's possible." />
            </h2>
            <p className="body-lg mt-4 max-w-lg dark:!text-ink-snow-muted">
              <EditableText page="guest" field="who_body" fallback="We don't care about titles. We care about whether you have done the work, made the mistakes, and formed real opinions from them." />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {guestTypes.map(g => (
              <div key={g.id} className="relative flex gap-5 p-6 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark h-full group/item">
                {admin && edit && <RemoveBtn onClick={() => removeG(g.id)} />}
                <span className="text-2xl shrink-0 mt-0.5" role="img">
                  {EF ? <EF value={g.icon} onSave={v => updateG(g.id,'icon',v)} /> : g.icon}
                </span>
                <div>
                  <h3 className="font-serif text-[17px] font-bold text-ink dark:text-ink-snow mb-1.5">
                    {EF ? <EF value={g.label} onSave={v => updateG(g.id,'label',v)} /> : g.label}
                  </h3>
                  <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed">
                    {EF ? <EF value={g.description} onSave={v => updateG(g.id,'description',v)} multiline /> : g.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {admin && edit && (
            <div className="mt-4">
              {addingG ? (
                <AddForm
                  fields={[
                    { key: 'icon',        placeholder: '🏫 icon emoji' },
                    { key: 'label',       placeholder: 'Guest type label' },
                    { key: 'description', placeholder: 'Short description', multiline: true },
                  ]}
                  onAdd={v => { const u=[...guestTypes,{id:`g${Date.now()}`,icon:v.icon||'🎯',label:v.label,description:v.description}]; setGuestTypes(u); savePageArray(GTYPES_KEY,u); setAddingG(false) }}
                  onCancel={() => setAddingG(false)}
                />
              ) : (
                <AddRowBtn label="Add Guest Type" onClick={() => setAddingG(true)} />
              )}
            </div>
          )}
        </div>
      </section>

      <div className="container-editorial"><div className="border-t border-rim dark:border-rim-dark" /></div>

      {/* ── What to Expect ───────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">
          <div className="mb-12">
            <p className="eyebrow mb-3">
              <EditableText page="guest" field="expect_eyebrow" fallback="What to Expect" />
            </p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight">
              <EditableText page="guest" field="expect_h2" fallback="We keep it simple. And good." />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expectSteps.map(e => (
              <div key={e.id} className="relative flex gap-5 p-7 rounded-2xl border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark h-full group/item">
                {admin && edit && <RemoveBtn onClick={() => removeE(e.id)} />}
                <span className="font-serif text-[13px] font-bold text-sage dark:text-sage-glow shrink-0 mt-0.5 w-8">
                  {EF ? <EF value={e.step} onSave={v => updateE(e.id,'step',v)} /> : e.step}
                </span>
                <div>
                  <h3 className="font-serif text-[17px] font-bold text-ink dark:text-ink-snow mb-2">
                    {EF ? <EF value={e.title} onSave={v => updateE(e.id,'title',v)} /> : e.title}
                  </h3>
                  <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed">
                    {EF ? <EF value={e.body} onSave={v => updateE(e.id,'body',v)} multiline /> : e.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {admin && edit && (
            <div className="mt-4">
              {addingE ? (
                <AddForm
                  fields={[
                    { key: 'step',  placeholder: '05' },
                    { key: 'title', placeholder: 'Step title' },
                    { key: 'body',  placeholder: 'Step description', multiline: true },
                  ]}
                  onAdd={v => { const u=[...expectSteps,{id:`e${Date.now()}`,step:v.step||String(expectSteps.length+1).padStart(2,'0'),title:v.title,body:v.body}]; setExpectSteps(u); savePageArray(EXPECT_KEY,u); setAddingE(false) }}
                  onCancel={() => setAddingE(false)}
                />
              ) : (
                <AddRowBtn label="Add Step" onClick={() => setAddingE(true)} />
              )}
            </div>
          )}
        </div>
      </section>

      <div className="container-editorial"><div className="border-t border-rim dark:border-rim-dark" /></div>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial max-w-2xl">
          <div className="mb-10">
            <p className="eyebrow mb-3">
              <EditableText page="guest" field="faq_eyebrow" fallback="Common Questions" />
            </p>
            <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight">
              <EditableText page="guest" field="faq_h2" fallback="Quick answers." />
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map(f => (
              <div key={f.id} className="relative border-b border-rim dark:border-rim-dark pb-6 last:border-0 group/item">
                {admin && edit && <RemoveBtn onClick={() => removeF(f.id)} />}
                <h3 className="font-serif text-[17px] font-bold text-ink dark:text-ink-snow mb-2">
                  {EF ? <EF value={f.q} onSave={v => updateF(f.id,'q',v)} /> : f.q}
                </h3>
                <p className="font-sans text-sm text-ink-muted dark:text-ink-snow-muted leading-relaxed">
                  {EF ? <EF value={f.a} onSave={v => updateF(f.id,'a',v)} multiline /> : f.a}
                </p>
              </div>
            ))}
          </div>

          {admin && edit && (
            <div className="mt-4">
              {addingF ? (
                <AddForm
                  fields={[
                    { key: 'q', placeholder: 'Question?' },
                    { key: 'a', placeholder: 'Answer...', multiline: true },
                  ]}
                  onAdd={v => { const u=[...faqs,{id:`f${Date.now()}`,q:v.q,a:v.a}]; setFaqs(u); savePageArray(FAQS_KEY,u); setAddingF(false) }}
                  onCancel={() => setAddingF(false)}
                />
              ) : (
                <AddRowBtn label="Add FAQ" onClick={() => setAddingF(true)} />
              )}
            </div>
          )}
        </div>
      </section>

      <div className="container-editorial"><div className="border-t border-rim dark:border-rim-dark" /></div>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial max-w-xl mx-auto text-center">
          <p className="eyebrow mb-5">
            <EditableText page="guest" field="cta2_eyebrow" fallback="Ready?" />
          </p>
          <h2 className="font-serif text-display-sm font-bold text-ink dark:text-ink-snow leading-tight tracking-tight text-balance mb-5">
            <EditableText page="guest" field="cta2_h2" fallback="Send us a note. We read everything." />
          </h2>
          <p className="body-lg mb-8 dark:!text-ink-snow-muted text-balance">
            <EditableText page="guest" field="cta2_body" fallback="A sentence or two about who you are and what you want to discuss is enough. We'll come back to you within 48 hours." />
          </p>
          <a
            href="mailto:office@theclarityproject.in?subject=Guest%20Application%20—%20The%20Clarity%20Project"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold bg-sage text-white px-6 py-3.5 rounded-xl hover:bg-sage-hover transition-all duration-200 shadow-sm"
          >
            office@theclarityproject.in
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </a>
        </div>
      </section>

      <SubscribeCTA />
    </>
  )
}
