import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  variant: 'primary' | 'secondary' | 'ghost'
  size: 'sm' | 'md'
  ariaLabel: string
  onClick?: () => void
}

export function Button({
  children,
  variant,
  size,
  ariaLabel,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`btn btn-${variant} btn-${size}`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
