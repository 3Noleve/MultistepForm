import { HomePage } from '~/app/auth/page'
import styles from '~/app/forms/layout.module.scss'
import { Flex } from '~/components/ui'
import { cn } from '~/lib/utils'

export default function Home() {
  return (
    <Flex
      direction={'column'}
      align={'start'}
      className={cn(
        styles.wrapper,
        'mt-6 rounded-3xl bg-primary-foreground px-28 py-16'
      )}
    >
      <HomePage />
    </Flex>
  )
}
