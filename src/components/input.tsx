import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const inputVariants = tv({
  base: 'bg-transparent text-lg placeholder-zinc-400 outline-none flex-1',
  variants: {
    variant: {
      primary: '',
      secondary: 'w-40',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

interface InputProps
  extends ComponentProps<'input'>,
    VariantProps<typeof inputVariants> {}

export function Input({ variant, ...props }: InputProps) {
  return <input {...props} className={inputVariants({ variant })} />
}
