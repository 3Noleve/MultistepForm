import { Metadata } from 'next'

import { Flex } from '~/components/ui'

interface FormsLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Страница Формы',
  description: 'Введите свои данные в форму'
}

export default function FormsLayout({ children }: FormsLayoutProps) {
  return (
    <Flex className='mt-6 rounded-3xl bg-primary-foreground px-28 py-16'>
      {children}
    </Flex>
  )
}
