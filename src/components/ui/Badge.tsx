import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'sage'
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span className={cn(
      'tag',
      variant === 'sage'
        ? 'bg-sage-light text-sage dark:bg-sage/15 dark:text-sage-glow'
        : 'bg-parchment-dim text-ink-muted dark:bg-charcoal-lift dark:text-ink-snow-muted',
      className
    )}>
      {children}
    </span>
  )
}
