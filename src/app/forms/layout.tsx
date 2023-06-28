import { Flex } from '~/components/ui'

interface FormsLayoutProps {
  children: React.ReactNode
}

export default function FormsLayout({ children }: FormsLayoutProps) {
  return (
    <Flex className='mt-6 rounded-3xl bg-primary-foreground px-28 py-16'>
      {children}
    </Flex>
  )
}
