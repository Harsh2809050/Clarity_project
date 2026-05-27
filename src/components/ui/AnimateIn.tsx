'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'up' | 'left' | 'right' | 'none'

interface AnimateInProps {
  children: ReactNode
  delay?: number
  direction?: Direction
  className?: string
  duration?: number
}

type MotionTarget = { opacity: number; y?: number; x?: number }

const initial: Record<Direction, MotionTarget> = {
  up:    { opacity: 0, y: 28 },
  left:  { opacity: 0, x: -20 },
  right: { opacity: 0, x: 20 },
  none:  { opacity: 0 },
}

const visible: MotionTarget = { opacity: 1, y: 0, x: 0 }

export function AnimateIn({
  children,
  delay = 0,
  direction = 'up',
  className,
  duration = 0.55,
}: AnimateInProps) {
  return (
    <motion.div
      initial={initial[direction]}
      whileInView={visible}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* Stagger container — wraps a list of children that each fade in sequentially */
interface StaggerProps {
  children: ReactNode
  className?: string
  stagger?: number
  delayStart?: number
}

const staggerVariants = (stagger: number, delayStart: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delayStart,
    },
  },
})

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function StaggerList({ children, className, stagger = 0.1, delayStart = 0 }: StaggerProps) {
  return (
    <motion.div
      variants={staggerVariants(stagger, delayStart)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}
