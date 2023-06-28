import * as React from 'react'
import { cn } from '~/lib/utils'
import { Flex, Label } from '.'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: number
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, type = 'checkbox', id, ...props }, ref) => {
    return (
      <Flex gap={8}>
        <input
          ref={ref}
          className={cn(
            'peer h-4 w-4 shrink-0 rounded-md border-4 border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
            className
          )}
          type={type}
          id={id}
          {...props}
        />

        {label && <Label>{label}</Label>}
      </Flex>
    )
  }
)
