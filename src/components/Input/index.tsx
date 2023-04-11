import { clsx } from 'clsx'
import { InputHTMLAttributes, forwardRef } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | null
}

const Input = forwardRef<InputProps, any>(
  ({ error, children, className, ...rest }, ref) => {
    return (
      <label className="flex flex-col gap-1">
        <input
          className={clsx(
            'rounded bg-gray-200 px-4 py-2 text-lg placeholder:text-slate-600 dark:bg-slate-800 dark:text-slate-200',
            className
          )}
          ref={ref}
          {...rest}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </label>
    )
  }
)

Input.displayName = 'Input'
export default Input
