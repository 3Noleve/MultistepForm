import { HtmlHTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '~/lib/utils'

export const FlexVariants = cva('flex', {
  variants: {
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between'
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end'
    },
    direction: {
      row: 'flex-row',
      column: 'flex-col'
    },
    gap: {
      0: 'gap',
      4: 'gap-1',
      8: 'gap-2',
      16: 'gap-4',
      24: 'gap-6',
      32: 'gap-8'
    }
  },
  defaultVariants: {
    gap: 0,
    align: 'center',
    direction: 'row',
    justify: 'start'
  }
})

export interface FlexProps
  extends HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof FlexVariants> {
  fill?: boolean
}

export const Flex = ({
  className,
  gap,
  align,
  direction,
  justify,
  fill,
  children,
  ...props
}: FlexProps) => {
  return (
    <div
      className={cn(
        fill && 'w-full max-w-full',
        FlexVariants({ gap, align, direction, justify, className })
      )}
      {...props}
    >
      {children}
    </div>
  )
}
