import { useEffect, useState } from 'react'

export const useSystemTheme = () => {

    const [theme, setTheme] = useState('light')
    const [mountedComponent, setMountedComponent] = useState(false)

    const setMode = (mode: string) => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    }

    const themeToggler = () => {
        theme === 'light'
        ? setMode('dark')
        : setMode('light')
    }

    const getSystemTheme = (): string => {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      } else {
        return 'light'
      }
    }

    useEffect(() => {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => 
        setTheme(e.matches ? 'dark' : 'light')
      )
      setTheme(getSystemTheme())
      setMountedComponent(true)
      return () => {
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {
        })
      }
    }, [])

    return [theme, themeToggler, mountedComponent]
};