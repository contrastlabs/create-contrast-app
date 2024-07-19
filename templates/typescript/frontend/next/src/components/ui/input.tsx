'use client'

import { Eye, EyeOff } from 'lucide-react'
import { type InputHTMLAttributes, forwardRef, useState } from 'react'
import { type VariantProps, tv } from 'tailwind-variants'

import { cn } from '@/lib/utils'

const input = tv({
  base: ['h-[40px] px-4', 'rounded-md outline-none bg-transparent'],
  variants: {
    variant: {
      filled: '',
      outline:
        'text-sm text-gray-300 border border-gray-500 bg-transparent placeholder-gray-400',
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
})

type InputVariants = VariantProps<typeof input>

type InputDefault = InputHTMLAttributes<HTMLInputElement>

interface InputProps extends InputDefault, InputVariants {
  icon?: React.ReactNode
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, variant, icon, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="w-full relative flex flex-col">
        {icon && <span className="absolute top-2.5 left-0 px-4">{icon}</span>}

        <input
          ref={ref}
          type={type === 'password' && showPassword ? 'text' : type}
          className={cn(
            input({ variant }),
            error ? 'border-2 border-red-500' : '',
            icon ? 'pl-10' : '',
            className,
          )}
          autoComplete="off"
          {...props}
        />

        {type === 'password' && (
          <button
            type="button"
            className="absolute top-4 right-0 px-4"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} className="text-zinc-400" />
            ) : (
              <Eye size={20} className="text-zinc-400" />
            )}
          </button>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
