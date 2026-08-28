import type { ReactNode } from 'react'

type BadgeProps = {
  children: ReactNode
  tone: 'success' | 'warning' | 'danger' | 'neutral'
}

export function Badge({ children, tone }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}
