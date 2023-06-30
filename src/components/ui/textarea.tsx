import * as React from 'react'
import { FieldError } from 'react-hook-form'

import { cn } from '~/lib/utils'

import { Flex, Label } from '.'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: FieldError
  chars?: number
  maxChars?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, chars, maxChars, ...props }, ref) => {
    return (
      <Flex
        direction={'column'}
        align={'start'}
        gap={8}
        fill
      >
        {label && <Label>{label}</Label>}

        <textarea
          className={cn(
            'flex min-h-[80px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />

        <Label className='text-xs text-muted-foreground'>{`${chars} / ${maxChars}`}</Label>

        {error && <Label className='text-destructive'>{error.message}</Label>}
      </Flex>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
