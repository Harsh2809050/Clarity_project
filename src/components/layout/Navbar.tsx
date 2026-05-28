'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/components/ui/ThemeProvider'
import { ClarityLogo } from '@/components/ui/ClarityLogo'
import { cn } from '@/lib/utils'

const links = [
  { href: '/about',      label: 'About' },
  { href: '/our-work',   label: 'Our Work' },
  { href: '/guests',     label: 'Guests' },
  { href: '/be-a-guest', label: 'Be a Guest' },
]

function SunIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const pathname                   = usePathname()
  const { theme, toggle }          = useTheme()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header className={cn(
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      'bg-parchment/90 dark:bg-charcoal/90 backdrop-blur-md',
      scrolled
        ? 'border-b border-rim dark:border-rim-dark shadow-[0_1px_12px_0_rgb(0_0_0_/_0.04)]'
        : 'border-b border-transparent'
    )}>
      <nav className="container-editorial flex items-center justify-between h-[80px]">

        {/* Brand */}
        <ClarityLogo variant="horizontal" size={70} asLink />

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(({ href, label }) => (
            <Link key={href} href={href}
              className={cn(
                'font-sans text-[13px] transition-colors duration-200',
                pathname === href
                  ? 'text-ink dark:text-ink-snow font-medium'
                  : 'text-ink-muted dark:text-ink-snow-muted hover:text-ink dark:hover:text-ink-snow'
              )}>
              {label}
            </Link>
          ))}

          {/* Search icon */}
          <Link href="/search" aria-label="Search"
            className={cn('w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200',
              pathname === '/search'
                ? 'text-sage bg-sage/10'
                : 'text-ink-muted dark:text-ink-snow-muted hover:text-ink dark:hover:text-ink-snow hover:bg-parchment-dim dark:hover:bg-charcoal-lift'
            )}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </Link>

          {/* Dark mode toggle */}
          <button onClick={toggle} aria-label="Toggle dark mode"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-muted dark:text-ink-snow-muted hover:text-ink dark:hover:text-ink-snow hover:bg-parchment-dim dark:hover:bg-charcoal-lift transition-all duration-200">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <Link href="/subscribe"
            className="font-sans text-[13px] font-medium bg-sage text-white px-4 py-2 rounded-xl hover:bg-sage-hover transition-all duration-200 shadow-sm">
            Subscribe Free
          </Link>
        </div>

        {/* Mobile: theme + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggle} aria-label="Toggle dark mode"
            className="w-9 h-9 flex items-center justify-center text-ink-muted dark:text-ink-snow-muted rounded-lg hover:bg-parchment-dim dark:hover:bg-charcoal-lift transition-all">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? 'Close' : 'Menu'} aria-expanded={menuOpen}
            className="w-9 h-9 flex flex-col gap-[5px] items-center justify-center rounded-lg hover:bg-parchment-dim dark:hover:bg-charcoal-lift transition-all">
            <span className={cn('block w-5 h-[1.5px] bg-ink dark:bg-ink-snow transition-all duration-300 origin-center', menuOpen && 'rotate-45 translate-y-[6.5px]')} />
            <span className={cn('block w-5 h-[1.5px] bg-ink dark:bg-ink-snow transition-all duration-300', menuOpen && 'opacity-0 scale-x-0')} />
            <span className={cn('block w-5 h-[1.5px] bg-ink dark:bg-ink-snow transition-all duration-300 origin-center', menuOpen && '-rotate-45 -translate-y-[6.5px]')} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn(
        'md:hidden overflow-hidden transition-all duration-300 ease-smooth',
        menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="border-t border-rim dark:border-rim-dark bg-parchment/95 dark:bg-charcoal/95 backdrop-blur-md px-6 py-5 flex flex-col gap-4">
          {links.map(({ href, label }) => (
            <Link key={href} href={href}
              className={cn('font-sans text-sm py-0.5', pathname === href ? 'text-ink dark:text-ink-snow font-medium' : 'text-ink-muted dark:text-ink-snow-muted')}>
              {label}
            </Link>
          ))}
          <Link href="/subscribe"
            className="font-sans text-sm font-medium bg-sage text-white px-4 py-2.5 rounded-xl text-center mt-1">
            Subscribe Free
          </Link>
        </div>
      </div>
    </header>
  )
}
