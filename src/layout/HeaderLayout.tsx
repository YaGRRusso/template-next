import { ErrorBoundary } from '@/components'
import { useThemeContext } from '@/contexts/ThemeContext'
import clsx from 'clsx'
import { NextPage } from 'next'
import Link from 'next/link'
import { MoonStars, Sun } from 'phosphor-react'
import { HTMLAttributes, useMemo } from 'react'

export interface HeaderLayoutProps extends HTMLAttributes<HTMLDivElement> {}

const HeaderLayout: NextPage<HeaderLayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useThemeContext()

  const currentTheme = useMemo(() => {
    return theme === 'dark' ? 'dark bg-slate-900 text-slate-100' : ''
  }, [theme])

  return (
    <div className={clsx('flex min-h-screen flex-col', currentTheme)}>
      <header className="container flex items-center justify-between py-4">
        <span>Header</span>
        <button onClick={toggleTheme} className="text-xl">
          {theme === 'dark' ? <MoonStars /> : <Sun />}
        </button>
      </header>
      <div className="container flex flex-1 items-center justify-center py-4">
        <ErrorBoundary>
          <>{children}</>
        </ErrorBoundary>
      </div>
      <footer className="container flex items-center justify-between py-4">
        <span>Footer</span>
        <div className="flex items-center gap-4">
          <Link href="" locale="pt-br">
            🇧🇷
          </Link>
          <Link href="" locale="en-us">
            🇺🇸
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default HeaderLayout
