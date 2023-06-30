'use client'

import Link from 'next/link'

import { Avatar, Flex, Label } from '../ui'

interface Socials {
  url: string
  name: string
}

interface ProfileProps {
  fullName: `${string} ${string}`
}

export const Profile = ({ fullName }: ProfileProps) => {
  const initials = fullName.split(' ') as [string, string]

  return (
    <Flex
      direction={'row'}
      align={'center'}
      gap={24}
      className='mb-6 pb-6'
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
