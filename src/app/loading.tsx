import { Flex, Label } from '~/components'

const loading = () => {
  return (
    <Flex
      align={'center'}
      justify={'center'}
      className='h-screen'
    >
      <Label className='text-2xl'>Loading...</Label>
    </Flex>
  )
}

export default loading
