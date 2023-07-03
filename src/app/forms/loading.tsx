import { Flex, Label } from '~/components'

const loading = () => {
  return (
    <Flex
      justify={'center'}
      align={'center'}
      className='h-20'
      fill
    >
      <Label className='text-2xl'>Loading Form...</Label>
    </Flex>
  )
}

export default loading
