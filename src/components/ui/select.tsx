import { ChangeEvent, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import { Flex, Label } from '.'
import { cn } from '~/lib/utils'

interface Options<T extends string> {
  value: T
  content: string
  id?: string
}

interface SelectProps<T extends string> {
  options: Options<T>[]
  label: string
  error?: FieldError
  onChange?: (value: T) => void
  id?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps<string>>(
  ({ label, options, error, onChange, id, ...props }, ref) => {
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value as string)
      }
    }

    return (
      <Flex
        direction={'column'}
        align={'start'}
        gap={8}
        fill
      >
        {label && <Label>{label}</Label>}

        <select
          ref={ref}
          className={cn(
            'max-w-[19rem] w-full p-3 rounded-md outline-none border bg-transparent text-popover-foreground shadow-md animate-in fade-in-80'
          )}
          onChange={onChangeHandler}
          id={id}
          {...props}
        >
          {options.map((option) => (
            <option
              className={cn(
                'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
              )}
              key={option.value}
              {...option}
            >
              {option.content}
            </option>
          ))}
        </select>

        {error && <Label className='text-destructive'>{error.message}</Label>}
      </Flex>
    )
  }
)
