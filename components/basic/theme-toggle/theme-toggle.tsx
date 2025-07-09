"use client"

import { useEffect, useState } from 'react'
import styles from "./theme-toggle.module.css"
import { SunIcon } from "@/components/basic/icons/sun-icon"
import { MoonIcon } from "@/components/basic/icons/moon-icon"

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  // Sync with localStorage & prefers-color-scheme
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const enabled = stored === 'dark' || (!stored && prefersDark)
    setIsDark(enabled)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(enabled ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newDark ? 'dark' : 'light')
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
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