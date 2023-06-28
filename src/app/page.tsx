import AboutMeForm from '~/app/auth/page'
import { Flex } from '~/components/ui'

export default function Home() {
  return (
    <Flex
      direction={'column'}
      align={'start'}
      className='mt-6 rounded-3xl bg-primary-foreground px-28 py-16'
    >
      <AboutMeForm />
    </Flex>
  )
}
