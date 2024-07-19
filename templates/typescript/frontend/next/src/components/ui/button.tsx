import type { ButtonHTMLAttributes } from 'react'
import { type VariantProps, tv } from 'tailwind-variants'

import { cn } from '@/lib/utils'

const button = tv({
  base: [
    'w-fit h-[40px] px-4',
    'flex items-center justify-center gap-2',
    'font-sans text-sm font-medium',
    'rounded-md transition transition-colors duration-300 ease-in-out',
  ],
  variants: {
    variant: {
      primaryFilled: 'text-white bg-blue-500 hover:bg-blue-600',
      primaryOutline:
        "text-blue-300 border border-blue-500 bg-transparent hover:multi-['text-white;bg-blue-500']",
      secondaryFilled: 'text-white bg-gray-500 hover:bg-gray-600',
      secondaryOutline:
        "text-gray-300 border border-gray-500 bg-transparent hover:multi-['text-white;bg-gray-500']",
    },
  },
  defaultVariants: {
    variant: 'primaryFilled',
  },
})

type ButtonVariants = VariantProps<typeof button>

type ButtonDefault = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>

interface ButtonProps extends ButtonDefault, ButtonVariants {
  icon?: React.ReactNode
  children: React.ReactNode
}

export function Button({
  type,
  className,
  variant,
  icon,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      className={cn(button({ variant }), className)}
      {...rest}
    >
      {icon && <span>{icon}</span>}

      {children}
    </button>
  )
}
