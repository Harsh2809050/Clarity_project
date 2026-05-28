'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SubscribeCTA } from '@/components/home/SubscribeCTA'
import { TableOfContents } from '@/components/work/TableOfContents'
import { EditableText } from './EditableText'
import { getWorkIssues, saveWorkIssues, isAdmin, isEditMode } from '@/lib/page-content'
import { workIssues as staticIssues, type WorkIssue } from '@/data/work'
import { ImageUploadField } from './ImageUploadField'
import { ShareButtons } from '@/components/ui/ShareButtons'

const EMPTY_ISSUE: WorkIssue = {
  id: '', issueNumber: 0, date: '', topic: '', headline: '', subheadline: '',
  episodeUrl: '', thumbnail: '', readTime: '8 min read',
  guest: { name: '', title: '' },
  pullQuotes: [{ quote: '', attribution: '' }],
  sections: [{ heading: '', paragraphs: [''] }],
}

function AddIssueForm({ onAdd, onCancel, nextNumber }: {
  onAdd: (issue: WorkIssue) => void
  onCancel: () => void
  nextNumber: number
}) {
  const [form, setForm] = useState<WorkIssue>({ ...EMPTY_ISSUE, issueNumber: nextNumber, id: `issue-${nextNumber.toString().padStart(2,'0')}` })

  function set(key: string, val: string | number) {
    setForm(p => ({ ...p, [key]: val }))
  }
  function setGuest(key: string, val: string) {
    setForm(p => ({ ...p, guest: { ...p.guest, [key]: val } }))
  }
  function setSection(i: number, key: string, val: string) {
    const s = [...form.sections]
    s[i] = { ...s[i], [key]: val }
    setForm(p => ({ ...p, sections: s }))
  }
  function addSection() {
    setForm(p => ({ ...p, sections: [...p.sections, { heading: '', paragraphs: [''] }] }))
  }
  function addPara(si: number) {
    const s = [...form.sections]
    s[si] = { ...s[si], paragraphs: [...s[si].paragraphs, ''] }
    setForm(p => ({ ...p, sections: s }))
  }
  function setPara(si: number, pi: number, val: string) {
    const s = [...form.sections]
    s[si] = { ...s[si], paragraphs: s[si].paragraphs.map((p, idx) => idx === pi ? val : p) }
    setForm(p => ({ ...p, sections: s }))
  }
  function setPQ(i: number, key: string, val: string) {
    const pq = [...form.pullQuotes]
    pq[i] = { ...pq[i], [key]: val }
    setForm(p => ({ ...p, pullQuotes: pq }))
  }

  const inp = 'w-full px-3 py-2 rounded-lg border border-rim dark:border-rim-dark bg-surface dark:bg-surface-dark text-sm text-ink dark:text-ink-snow focus:outline-none focus:ring-2 focus:ring-sage/50'
  const lbl = 'block font-sans text-[11px] font-semibold uppercase tracking-wider text-ink-faint dark:text-ink-snow-faint mb-1'

  return (
    <div className="fixed inset-0 z-[9998] bg-black/60 flex items-start justify-center overflow-y-auto p-4 pt-10">
      <div className="bg-parchment dark:bg-charcoal w-full max-w-2xl rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-serif text-xl font-bold text-ink dark:text-ink-snow">Add New Issue</h2>
          <button onClick={onCancel} className="text-ink-faint hover:text-ink dark:hover:text-ink-snow text-xl leading-none">×</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div><label className={lbl}>Issue #</label><input type="number" className={inp} value={form.issueNumber} onChange={e => set('issueNumber', Number(e.target.value))} /></div>
          <div><label className={lbl}>Date</label><input className={inp} value={form.date} onChange={e => set('date', e.target.value)} placeholder="May 19, 2026" /></div>
          <div><label className={lbl}>Topic</label><input className={inp} value={form.topic} onChange={e => set('topic', e.target.value)} placeholder="Education & Leadership" /></div>
          <div><label className={lbl}>Read Time</label><input className={inp} value={form.readTime ?? ''} onChange={e => set('readTime', e.target.value)} placeholder="8 min read" /></div>
        </div>

        <div><label className={lbl}>Headline</label><input className={inp} value={form.headline} onChange={e => set('headline', e.target.value)} /></div>
        <div><label className={lbl}>Subheadline</label><input className={inp} value={form.subheadline ?? ''} onChange={e => set('subheadline', e.target.value)} /></div>

        <div className="grid grid-cols-2 gap-4">
          <div><label className={lbl}>Guest Name</label><input className={inp} value={form.guest.name} onChange={e => setGuest('name', e.target.value)} /></div>
          <div><label className={lbl}>Guest Title</label><input className={inp} value={form.guest.title} onChange={e => setGuest('title', e.target.value)} /></div>
        </div>

        <div className="col-span-2">
          <ImageUploadField value={form.thumbnail ?? ''} onChange={url => set('thumbnail', url)} />
        </div>
        <div><label className={lbl}>Episode URL</label><input className={inp} value={form.episodeUrl} onChange={e => set('episodeUrl', e.target.value)} /></div>

        <div className="space-y-3">
          <label className={lbl}>Pull Quote</label>
          <textarea className={`${inp} resize-none`} rows={2} value={form.pullQuotes[0]?.quote ?? ''} onChange={e => setPQ(0, 'quote', e.target.value)} placeholder="The quote..." />
          <input className={inp} value={form.pullQuotes[0]?.attribution ?? ''} onChange={e => setPQ(0, 'attribution', e.target.value)} placeholder="Attribution" />
        </div>

        <div className="space-y-4">
          <label className={lbl}>Sections</label>
          {form.sections.map((sec, si) => (
            <div key={si} className="p-4 rounded-xl border border-rim dark:border-rim-dark space-y-3">
              <input className={inp} value={sec.heading ?? ''} onChange={e => setSection(si, 'heading', e.target.value)} placeholder="Section heading (optional)" />
              {sec.paragraphs.map((para, pi) => (
                <textarea key={pi} className={`${inp} resize-none`} rows={3} value={para} onChange={e => setPara(si, pi, e.target.value)} placeholder="Paragraph text..." />
              ))}
              <button onClick={() => addPara(si)} className="text-xs text-sage dark:text-sage-glow font-medium hover:underline">+ Add paragraph</button>
            </div>
          ))}
          <button onClick={addSection} className="text-xs text-sage dark:text-sage-glow font-medium hover:underline">+ Add section</button>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={() => onAdd(form)} className="px-5 py-2.5 rounded-xl bg-sage text-white font-sans text-sm font-semibold hover:bg-sage-hover transition-all">
            Add Issue
          </button>
          <button onClick={onCancel} className="px-5 py-2.5 rounded-xl border border-rim dark:border-rim-dark text-ink-muted dark:text-ink-snow-muted text-sm hover:border-sage/30 transition-all">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export function WorkEditor() {
  const [issues, setIssues] = useState<WorkIssue[]>(staticIssues)
  const [admin,  setAdmin_] = useState(false)
  const [edit,   setEdit]   = useState(false)
  const [adding, setAdding] = useState(false)
  const [delConfirm, setDelConfirm] = useState<string | null>(null)

  useEffect(() => {
    setIssues(getWorkIssues(staticIssues))
    setAdmin_(isAdmin())
    setEdit(isEditMode())
    const h = () => setEdit(isEditMode())
    window.addEventListener('cp_edit_change', h)
    return () => window.removeEventListener('cp_edit_change', h)
  }, [])

  function addIssue(issue: WorkIssue) {
    const updated = [issue, ...issues]
    setIssues(updated)
    saveWorkIssues(updated)
    setAdding(false)
  }

  function deleteIssue(id: string) {
    const updated = issues.filter(i => i.id !== id)
    setIssues(updated)
    saveWorkIssues(updated)
    setDelConfirm(null)
  }

  const tocEntries = issues.map(i => ({ id: i.id, issueNumber: i.issueNumber, headline: i.headline }))
  const W = 'work'

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 bg-parchment dark:bg-charcoal dot-grid">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <AnimateIn><p className="eyebrow mb-5">Our Work</p></AnimateIn>
              <AnimateIn delay={0.1}>
                <h1 className="font-serif text-display font-bold text-ink dark:text-ink-snow leading-[1.06] tracking-tight text-balance mb-5">
                  <EditableText page={W} field="hero_h1" fallback="Every conversation, written out in full." />
                </h1>
              </AnimateIn>
              <AnimateIn delay={0.2}>
                <p className="body-lg max-w-xl dark:!text-ink-snow-muted">
                  <EditableText page={W} field="hero_body" fallback="This is not a summary and not a highlights reel. Each piece below is the full argument from the conversation — every insight, every implication, every idea that matters — written as a proper article you can read, share, and use." />
                </p>
              </AnimateIn>
            </div>

            {issues[0]?.thumbnail && (
              <AnimateIn delay={0.15} className="hidden lg:block">
                <div className="relative">
                  <div className="absolute -inset-6 rounded-3xl bg-sage/[0.07] dark:bg-sage/[0.05] blur-3xl pointer-events-none" />
                  <div className="relative rounded-2xl overflow-hidden border border-rim dark:border-rim-dark shadow-card-hover dark:shadow-card-hover-dark">
                    <div className="relative aspect-[2/1] overflow-hidden">
                      <Image src={issues[0].thumbnail} alt={issues[0].headline} fill priority sizes="600px" className="object-contain" unoptimized={issues[0].thumbnail.startsWith('data:')} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block font-sans text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-md bg-sage text-white">
                          Issue #{String(issues[0].issueNumber).padStart(2,'0')}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="font-serif text-white text-lg font-bold leading-snug line-clamp-2">{issues[0].headline}</p>
                      </div>
                    </div>
                    <div className="px-5 py-4 bg-surface dark:bg-surface-dark flex items-center justify-between">
                      <div>
                        <p className="font-sans text-[12px] font-semibold text-ink dark:text-ink-snow">{issues[0].guest.name}</p>
                        <p className="font-sans text-[11px] text-ink-faint dark:text-ink-snow-faint">{issues[0].guest.title}</p>
                      </div>
                      <span className="font-sans text-[11px] text-ink-faint dark:text-ink-snow-faint">{issues[0].readTime ?? '8 min read'}</span>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            )}
          </div>
        </div>
      </section>

      <div className="container-editorial"><div className="rule" /></div>

      {/* Issues */}
      <section className="section-y bg-parchment dark:bg-charcoal">
        <div className="container-editorial">

          {/* Add issue button (edit mode only) */}
          {admin && edit && (
            <div className="mb-8">
              <button
                onClick={() => setAdding(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sage text-white font-sans text-sm font-semibold hover:bg-sage-hover transition-all shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add New Issue
              </button>
            </div>
          )}

          {issues.length === 0 ? (
            <p className="font-sans text-ink-muted dark:text-ink-snow-muted text-center py-24">First issue coming soon.</p>
          ) : (
            <div className="flex gap-10 xl:gap-14">
              <TableOfContents entries={tocEntries} />
              <div className="flex-1 min-w-0 space-y-28">
                {issues.map((issue, issueIdx) => (
                  <AnimateIn key={issue.id} delay={issueIdx * 0.04}>
                    <article id={issue.id} className="relative">

                      {/* Delete button */}
                      {admin && edit && (
                        <div className="absolute -top-4 right-0 z-10">
                          {delConfirm === issue.id ? (
                            <div className="flex items-center gap-2">
                              <button onClick={() => deleteIssue(issue.id)} className="px-3 py-1 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600">Delete</button>
                              <button onClick={() => setDelConfirm(null)} className="px-3 py-1 rounded-lg border border-rim dark:border-rim-dark text-xs text-ink-muted">Cancel</button>
                            </div>
                          ) : (
                            <button onClick={() => setDelConfirm(issue.id)} className="px-3 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-all">
                              Delete Issue
                            </button>
                          )}
                        </div>
                      )}

                      <header className="mb-10 pb-10 border-b border-rim dark:border-rim-dark">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sage text-white font-sans text-[12px] font-bold shrink-0">{issue.issueNumber}</span>
                          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint dark:text-ink-snow-faint">
                            Issue #{String(issue.issueNumber).padStart(2,'0')} &nbsp;·&nbsp;{issue.date} &nbsp;·&nbsp;{issue.topic}
                          </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-[2.6rem] font-bold text-ink dark:text-ink-snow leading-tight tracking-tight text-balance mb-2">
                          <EditableText page={W} field={`${issue.id}_headline`} fallback={issue.headline} />
                        </h2>
                        {issue.subheadline && (
                          <p className="font-serif text-2xl md:text-3xl font-bold text-sage leading-tight tracking-tight mb-7">
                            <EditableText page={W} field={`${issue.id}_sub`} fallback={issue.subheadline} />
                          </p>
                        )}
                        <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-sage dark:text-sage-glow">
                          A conversation with{' '}
                          <EditableText page={W} field={`${issue.id}_guest`} fallback={issue.guest.name} />
                          &nbsp;·&nbsp;
                          <EditableText page={W} field={`${issue.id}_gtitle`} fallback={issue.guest.title} />
                        </p>
                      </header>

                      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_280px] gap-12 xl:gap-14">
                        <div>
                          {issue.sections.map((section, sIdx) => {
                            const mid = Math.floor(issue.sections.length / 2)
                            const pqIdx = sIdx === mid ? 0 : sIdx === mid + 2 ? 1 : -1
                            const showPQ = pqIdx >= 0 && pqIdx < issue.pullQuotes.length
                            return (
                              <div key={sIdx}>
                                <div className="mb-8">
                                  {section.heading && (
                                    <h3 className="font-serif text-[1.25rem] font-bold text-ink dark:text-ink-snow mb-5 leading-snug">
                                      <EditableText page={W} field={`${issue.id}_s${sIdx}_h`} fallback={section.heading} />
                                    </h3>
                                  )}
                                  <div className="space-y-5">
                                    {section.paragraphs.map((para, pIdx) => (
                                      <p key={pIdx} className="font-sans text-[1rem] text-ink-muted dark:text-ink-snow-muted leading-[1.85]">
                                        <EditableText page={W} field={`${issue.id}_s${sIdx}_p${pIdx}`} fallback={para} />
                                      </p>
                                    ))}
                                  </div>
                                </div>
                                {showPQ && (
                                  <blockquote className="my-10 border-l-[3px] border-sage pl-6">
                                    <p className="font-serif text-[1.35rem] font-bold text-ink dark:text-ink-snow leading-snug italic mb-3">
                                      &ldquo;<EditableText page={W} field={`${issue.id}_pq${pqIdx}_q`} fallback={issue.pullQuotes[pqIdx].quote} />&rdquo;
                                    </p>
                                    <cite className="not-italic font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-sage dark:text-sage-glow">
                                      — <EditableText page={W} field={`${issue.id}_pq${pqIdx}_a`} fallback={issue.pullQuotes[pqIdx].attribution} />
                                    </cite>
                                  </blockquote>
                                )}
                              </div>
                            )
                          })}
                          <div className="mt-12 pt-8 border-t border-rim dark:border-rim-dark space-y-5">
                            <div className="flex flex-wrap items-center gap-5">
                              <a href={issue.episodeUrl} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold bg-sage text-white px-5 py-2.5 rounded-xl hover:bg-sage-hover transition-all shadow-sm">
                                🎙&nbsp; Listen to the episode
                              </a>
                              <Link href={`/issues/${issue.id}`} className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-sage dark:text-sage-glow hover:underline underline-offset-4">
                                View full page →
                              </Link>
                              <Link href="/subscribe" className="font-sans text-[13px] font-medium text-ink-faint dark:text-ink-snow-faint hover:text-sage dark:hover:text-sage-glow hover:underline underline-offset-4 transition-colors">
                                Get the next issue free →
                              </Link>
                            </div>
                            <ShareButtons url={`/issues/${issue.id}`} title={issue.headline} />
                          </div>
                        </div>

                        <aside className="hidden lg:block">
                          <div className="sticky top-28 space-y-5">
                            {issue.thumbnail && (
                              <div className="rounded-2xl overflow-hidden border border-rim dark:border-rim-dark shadow-card dark:shadow-card-dark">
                                <div className="relative aspect-[4/3] overflow-hidden bg-parchment-dim dark:bg-charcoal-card">
                                  <Image src={issue.thumbnail} alt={issue.headline} fill sizes="300px" className="object-contain" unoptimized={issue.thumbnail.startsWith('data:')} />
                                </div>
                                <div className="p-4 bg-surface dark:bg-surface-dark">
                                  <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-sage dark:text-sage-glow mb-1">{issue.topic}</p>
                                  <p className="font-serif text-[14px] font-bold text-ink dark:text-ink-snow leading-snug mb-4">A conversation with {issue.guest.name}</p>
                                  <a href={issue.episodeUrl} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full font-sans text-[13px] font-semibold bg-sage text-white px-4 py-2.5 rounded-xl hover:bg-sage-hover transition-all shadow-sm">
                                    🎙&nbsp; Listen to episode
                                  </a>
                                </div>
                              </div>
                            )}
                            {issue.pullQuotes[0] && (
                              <div className="relative p-5 rounded-2xl bg-surface dark:bg-surface-dark border border-sage/20 dark:border-sage-glow/15 shadow-card dark:shadow-card-dark overflow-hidden">
                                <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-sage via-sage-glow/60 to-transparent" />
                                <p className="font-serif text-[13.5px] italic text-ink dark:text-ink-snow leading-relaxed mb-3">
                                  &ldquo;{issue.pullQuotes[0].quote}&rdquo;
                                </p>
                                <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-sage dark:text-sage-glow">
                                  — {issue.pullQuotes[0].attribution}
                                </p>
                              </div>
                            )}
                            <div className="p-5 rounded-2xl bg-sage/[0.06] dark:bg-sage/[0.08] border border-sage/15 dark:border-sage-glow/15">
                              <p className="font-serif text-[15px] font-bold text-ink dark:text-ink-snow mb-1">Get the next one free</p>
                              <p className="font-sans text-[12px] text-ink-muted dark:text-ink-snow-muted leading-relaxed mb-4">Every week, one conversation worth your time — straight to your inbox.</p>
                              <Link href="/subscribe" className="inline-flex items-center gap-1.5 font-sans text-[12px] font-semibold text-sage dark:text-sage-glow hover:underline underline-offset-4">
                                Subscribe free →
                              </Link>
                            </div>
                          </div>
                        </aside>
                      </div>
                    </article>
                    {issueIdx < issues.length - 1 && <div className="mt-24 rule" />}
                  </AnimateIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <SubscribeCTA />

      {adding && (
        <AddIssueForm
          onAdd={addIssue}
          onCancel={() => setAdding(false)}
          nextNumber={Math.max(...issues.map(i => i.issueNumber), 0) + 1}
        />
      )}
    </>
  )
}
