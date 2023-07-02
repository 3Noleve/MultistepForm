import { Dispatch, ReactNode, SetStateAction } from 'react'
import Image from 'next/image'
import { X as Close } from 'lucide-react'

import { Button, Flex, Icons, Label } from '~/components'
import { Portal } from '~/components/ui/Portal'
import { useLockBody } from '~/lib/hooks'
import { cn } from '~/lib/utils'

import styles from './request-modal.module.scss'

interface RequestModalProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
  isSuccess: boolean
  successTitle?: string
}

export const RequestModal = ({
  children,
  active,
  setActive,
  isSuccess,
  successTitle,
  className,
  ...props
}: RequestModalProps) => {
  useLockBody({ active })

  return (
    <Portal>
      <div
        className={cn(styles.modal, {
          [styles.active]: active,
          className
        })}
        onClick={() => setActive(false)}
        {...props}
      >
        <div
          className={cn(styles.content, {
            [styles.active]: active
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <Flex
            direction={'column'}
            gap={32}
            fill
          >
            <Flex
              direction={'row'}
              justify={'center'}
              align={'center'}
              gap={32}
              fill
            >
              <Label className='mb-2 text-base'>
                {isSuccess
                  ? successTitle || 'Форма успешно отправлена'
                  : 'Ошибка'}
              </Label>

              <Button
                variant={'icon'}
                className={styles.close}
                onClick={() => setActive(false)}
              >
                <Close />
              </Button>
            </Flex>

            <Flex direction={'row'}>
              <div
                className={cn(styles.icon, {
                  [styles.failed]: !isSuccess
                })}
              >
                <Image
                  src={isSuccess ? Icons.Success : Icons.Fail}
                  alt='Icon'
                />
              </div>
            </Flex>
            {children}
          </Flex>
        </div>
      </div>
    </Portal>
  )
}
