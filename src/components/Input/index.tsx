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
            'rounded bg-slate-800 px-4 py-2 text-lg text-slate-200 placeholder:text-slate-600',
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

export default Input
