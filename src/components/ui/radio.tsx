import { forwardRef } from 'react'
import { cn } from '~/lib/utils'
import { Flex, Label } from '.'

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: number
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, type = 'radio', id, ...props }, ref) => {
    return (
      <Flex gap={8}>
        <input
          ref={ref}
          className={cn(
            'h-4 w-4 rounded-full border border-input focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50',
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
