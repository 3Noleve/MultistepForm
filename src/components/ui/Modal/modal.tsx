import { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import { X as Close } from 'lucide-react'

import { Button, Flex, Icons, Label } from '~/components'
import { useLockBody } from '~/lib/hooks'
import { cn } from '~/lib/utils'

import { Portal } from '../Portal/Portal'
import styles from './modal.module.scss'

interface ModalProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
  isSuccess: boolean
  children: React.ReactNode
}

export const Modal = ({
  active,
  setActive,
  isSuccess,
  children,
  className,
  ...props
}: ModalProps) => {
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
                {isSuccess ? 'Форма успешно отправлена' : 'Ошибка'}
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
