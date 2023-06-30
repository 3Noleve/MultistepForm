'use client'

import * as React from 'react'
import Image from 'next/image'
import { cva } from 'class-variance-authority'

import { cn } from '~/lib/utils'
import type { VariantProps } from 'class-variance-authority'

import { Flex, Label } from '.'

const avatarContainer = cva('w-full rounded-full', {
  variants: {
    size: {
      sm: 'max-w-[2.5rem] h-10',
      md: 'max-w-[5rem] h-20',
      xl: 'max-w-[10rem] h-40'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

const initialsSize = cva('inline-flex', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      xl: 'text-4xl'
    }
  },
  defaultVariants: {
    size: 'xl'
  }
})

interface AvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof avatarContainer>,
    VariantProps<typeof initialsSize> {
  fullName?: string
  initials?: [string, string]
}

const Avatar = ({ className, src, size, alt, initials }: AvatarProps) => {
  const [name, surname] = initials || ['', '']

  return (
    <Flex
      direction={'column'}
      justify={'center'}
      className={cn(
        avatarContainer({ size, className }),
        !src ? 'bg-ring text-primary-foreground' : ''
      )}
    >
      {src && (
        <Image
          src={src}
          alt={alt!}
          width={144}
          height={144}
          className={cn(
            'h-36 w-36 rounded-full bg-transparent object-cover',
            className
          )}
        />
      )}

      {!src && initials && (
        <Flex
          justify={'center'}
          align={'center'}
          direction={'row'}
        >
          <Label className={cn(initialsSize({ size, className }))}>
            {name[0]}
          </Label>

          <Label className={cn(initialsSize({ size, className }))}>
            {surname[0]}
          </Label>
        </Flex>
      )}
    </Flex>
  )
}

export { Avatar }
