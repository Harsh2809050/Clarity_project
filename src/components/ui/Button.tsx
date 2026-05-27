import { cn } from '@/lib/utils'
import Link from 'next/link'

type Variant = 'primary' | 'outline' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center gap-2 font-sans font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 active:scale-[0.97]'

const variants: Record<Variant, string> = {
  primary: 'bg-sage text-white hover:bg-sage-hover shadow-sm hover:shadow-md',
  outline: 'border border-rim dark:border-rim-dark text-ink dark:text-ink-snow hover:border-sage dark:hover:border-sage-glow hover:text-sage dark:hover:text-sage-glow bg-transparent',
  ghost:   'text-ink-muted dark:text-ink-snow-muted hover:text-ink dark:hover:text-ink-snow bg-transparent',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-[15px]',
}

export function Button({
  variant = 'primary', size = 'md', className, ...props
}: { variant?: Variant; size?: Size; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
}

export function LinkButton({
  href, variant = 'primary', size = 'md', external, className, children, ...props
}: {
  href: string; variant?: Variant; size?: Size; external?: boolean; className?: string; children: React.ReactNode
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const cls = cn(base, variants[variant], sizes[size], className)
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props}>{children}</a>
  return <Link href={href} className={cls}>{children}</Link>
}
