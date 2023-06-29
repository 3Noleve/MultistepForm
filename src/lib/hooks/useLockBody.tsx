import { useLayoutEffect } from 'react'

interface useLockBodyProps {
  active: boolean
}

export const useLockBody = ({ active = false }: useLockBodyProps) => {
  useLayoutEffect((): (() => void) => {
    const originalStyle = window.getComputedStyle(document.body).overflow

    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => (document.body.style.overflow = originalStyle)
  }, [active])
}
