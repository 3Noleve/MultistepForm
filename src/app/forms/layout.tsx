import { Flex } from '~/components/ui'

interface FormsLayoutProps {
  children: React.ReactNode
}

export default function FormsLayout({ children }: FormsLayoutProps) {
  return (
    <Flex className='rounded-3xl mt-6 bg-primary-foreground py-16 px-28'>
      {children}
    </Flex>
  )
}
