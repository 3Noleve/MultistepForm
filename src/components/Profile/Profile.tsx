'use client'

import { HtmlHTMLAttributes } from 'react'
import Link from 'next/link'

import { cn } from '~/lib/utils'

import { Avatar, Flex, Label } from '../ui'
import styles from './profile.module.scss'

interface ProfileProps extends HtmlHTMLAttributes<HTMLDivElement> {
  fullName: `${string} ${string}`
}

export const Profile = ({ fullName, className, ...props }: ProfileProps) => {
  const initials = fullName.split(' ') as [string, string]

  return (
    <Flex
      direction={'row'}
      align={'center'}
      gap={24}
      className={cn(styles.wrapper, 'mb-6 pb-6')}
      {...props}
    >
      <Link href={'https://t.me/noleve3'}>
        <Avatar
          initials={initials}
          src={'https://avatars.githubusercontent.com/u/106100900?v=4'}
        />
      </Link>

      <div>
        <Label className='cursor-pointer text-xl'>
          <a href={'https://t.me/noleve3'}>{fullName}</a>
        </Label>
      </div>
    </Flex>
  )
}

export default Profile
