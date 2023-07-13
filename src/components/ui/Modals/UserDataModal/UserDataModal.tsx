import { Dispatch, ReactNode, SetStateAction } from 'react'
import { X as Close } from 'lucide-react'

import { FormSchema } from '~/app/redux/features/FormSlice'
import { Button, Flex, Label } from '~/components'
import { Portal } from '~/components/ui/Portal'
import { useLockBody } from '~/lib/hooks'
import { cn } from '~/lib/utils'

import styles from '../RequestModal/request-modal.module.scss'

interface UserDataModalProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
  formData: FormSchema
}

export const UserDataModal = ({
  children,
  active,
  setActive,
  formData,
  className,
  ...props
}: UserDataModalProps) => {
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
              <Label className='mb-2 text-base'>Ваши Данные</Label>
            </Flex>
            <div>
              <pre className='mt-2 w-[330px] rounded-md bg-slate-950 p-4'>
                <code className='text-white'>
                  {JSON.stringify(formData, null, 2)}
                </code>
              </pre>
            </div>
            {children}
          </Flex>
        </div>
      </div>
    </Portal>
  )
}
