import * as React from 'react'

import { FieldError } from 'react-hook-form'
import { cn } from '~/lib/utils'
import { Flex, Label } from '~/components/ui'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: FieldError
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <Flex
        direction={'column'}
        gap={8}
        align={'start'}
        fill
      >
        {label && <Label>{label}</Label>}

        <input
          type={type}
          className={cn(
            'h-10 w-full max-w-[19rem] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />

        {error && (
          <Label className='text-destructive mt-1'>{error.message}</Label>
        )}
      </Flex>
    )
  }
)

Input.displayName = 'Input'

export { Input }
