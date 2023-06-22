import { Avatar, Flex, Label } from '../ui'

interface Socials {
  url: string
  name: string
}

interface ProfileProps {
  fullName: `${string} ${string}`
  socials?: Socials[]
}

export const Profile = ({ fullName, socials }: ProfileProps) => {
  const initials = fullName.split(' ') as [string, string]

  return (
    <Flex
      direction={'row'}
      align={'center'}
      gap={24}
      className='mb-6 pb-6'
    >
      <Avatar
        initials={initials}
        // src={'https://avatars.githubusercontent.com/u/106100900?v=4'}
      />

      {/* <Flex> */}
      <div>
        <Label className='text-xl'>{fullName}</Label>
      </div>

      {socials && (
        <Flex
          direction={'row'}
          gap={16}
          fill
        >
          Lorem
        </Flex>
      )}
      {/* </Flex> */}
    </Flex>
  )
}

export default Profile
