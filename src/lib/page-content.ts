const FIELD_PFX = 'cp_f_'
const ADMIN_KEY = 'cp_is_admin'
const EDIT_KEY  = 'cp_edit_mode'
const WORK_KEY  = 'cp_work_issues_v1'

/* ── field read/write ─────────────────────────────── */
export function getField(page: string, key: string, def: string): string {
  if (typeof window === 'undefined') return def
  return localStorage.getItem(`${FIELD_PFX}${page}_${key}`) ?? def
}
export function setField(page: string, key: string, val: string): void {
  localStorage.setItem(`${FIELD_PFX}${page}_${key}`, val)
}
export function clearField(page: string, key: string): void {
  localStorage.removeItem(`${FIELD_PFX}${page}_${key}`)
}

/* ── admin / edit-mode flags ──────────────────────── */
export function isAdmin(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(ADMIN_KEY) === '1'
}
export function setAdminFlag(on: boolean): void {
  if (on) localStorage.setItem(ADMIN_KEY, '1')
  else    localStorage.removeItem(ADMIN_KEY)
}

export function isEditMode(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(EDIT_KEY) === '1'
}
export function toggleEditMode(): void {
  const next = !isEditMode()
  if (next) localStorage.setItem(EDIT_KEY, '1')
  else      localStorage.removeItem(EDIT_KEY)
  window.dispatchEvent(new Event('cp_edit_change'))
}

/* ── generic array store (subscribe benefits, FAQs, etc) ── */
export function getPageArray<T>(key: string, fallback: T[]): T[] {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T[]) : fallback
  } catch { return fallback }
}
export function savePageArray<T>(key: string, items: T[]): void {
  localStorage.setItem(key, JSON.stringify(items))
}

/* ── work issues override store ───────────────────── */
import type { WorkIssue } from '@/data/work'

export function getWorkIssues(fallback: WorkIssue[]): WorkIssue[] {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(WORK_KEY)
    return raw ? (JSON.parse(raw) as WorkIssue[]) : fallback
  } catch { return fallback }
}
export function saveWorkIssues(issues: WorkIssue[]): void {
  localStorage.setItem(WORK_KEY, JSON.stringify(issues))
}
