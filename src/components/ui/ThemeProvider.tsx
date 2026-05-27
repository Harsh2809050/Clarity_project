'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeCtx {
  theme: Theme
  toggle: () => void
}

const Ctx = createContext<ThemeCtx>({ theme: 'light', toggle: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    // Only honour an explicit user choice — never auto-detect system dark mode
    // Wrapped in try/catch: Safari Private Mode throws QuotaExceededError on localStorage
    try {
      const stored = localStorage.getItem('cp-theme') as Theme | null
      apply(stored ?? 'light')
    } catch {
      apply('light')
    }
  }, [])

  function apply(t: Theme) {
    setTheme(t)
    document.documentElement.classList.toggle('dark', t === 'dark')
    try { localStorage.setItem('cp-theme', t) } catch { /* Safari Private Mode */ }
  }

  return (
    <Ctx.Provider value={{ theme, toggle: () => apply(theme === 'dark' ? 'light' : 'dark') }}>
      {children}
    </Ctx.Provider>
  )
}

export const useTheme = () => useContext(Ctx)
