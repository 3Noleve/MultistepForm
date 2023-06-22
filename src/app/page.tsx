import AboutMeForm from '~/app/auth/page'
import { Flex } from '~/components/ui'

export default function Home() {
  return (
    <Flex
      direction={'column'}
      align={'start'}
      className='rounded-3xl mt-6 bg-primary-foreground py-16 px-28'
    >
      <AboutMeForm />
    </Flex>
  )
}
