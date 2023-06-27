'use client'

import { forwardRef } from 'react'
import ReactInputMask from 'react-input-mask'
import { InputProps } from './input'
import { Flex, Label } from '.'
import { cn } from '~/lib/utils'

interface MaskInputProps extends InputProps {
  mask?: string | Array<string | RegExp>
}

const InputMask = forwardRef<HTMLInputElement, MaskInputProps>(
  ({ label, mask, error, className, ...props }, ref) => {
    return (
      <Flex
        direction={'column'}
        gap={8}
        align={'start'}
        fill
      >
        {label && <Label>{label}</Label>}

        <ReactInputMask
          inputRef={ref}
          className={cn(
            'h-10 w-full max-w-[19rem] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          mask={mask!}
          {...props}
        />

        {error && <Label className='text-destructive'>{error.message}</Label>}
      </Flex>
    )
  }
)

InputMask.displayName = 'Input-Mask'

export { InputMask }
