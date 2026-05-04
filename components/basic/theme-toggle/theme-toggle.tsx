"use client"

import { useEffect, useState } from 'react'
import styles from "./theme-toggle.module.css"
import { SunIcon } from "@/components/basic/icons/sun-icon"
import { MoonIcon } from "@/components/basic/icons/moon-icon"

const applyTheme = (isDark: boolean) => {
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(isDark ? 'dark' : 'light')
}

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(false)
    applyTheme(false)
    localStorage.removeItem('theme')
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    applyTheme(newDark)
  }

  return (
    <button aria-label="theme toggle" className={styles.toggleButton} onClick={toggleTheme}>
      {isDark ? (
        <SunIcon color={'var(--navyBlue)'} width={26} height={26} />
      ) : (
        <MoonIcon color={'var(--navyBlue)'} width={26} height={26} />
      )}
    </button>
  )
} 
