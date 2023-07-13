import { Metadata } from 'next'

import { Flex } from '~/components/ui'
import { cn } from '~/lib/utils'

import styles from './layout.module.scss'

interface FormsLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Страница Формы',
  description: 'Введите свои данные в форму'
}

export default function FormsLayout({ children }: FormsLayoutProps) {
  return (
    <Flex
      className={cn(
        styles.wrapper,
        'mt-6 rounded-3xl bg-primary-foreground px-28 py-16'
      )}
    >
      {children}
    </Flex>
  )
}
