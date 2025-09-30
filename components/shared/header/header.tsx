"use client"

import { LanguageSwitcher } from '@/components/basic/language-switcher/language-switcher'
import { ThemeToggle } from '@/components/basic/theme-toggle/theme-toggle'
import React, { useState, useEffect, useRef, FC } from 'react'
import styles from "./header.module.css"
import { Sections } from '@/types/constant'
import { useLandingStore, useContactActions } from '@/model/landing-store'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { projects } from '@/components/pages/works/projects-data'

// Componente separado para el enlace del CV, así los hooks no violan las reglas
interface CVLinkProps {
    link: { sectionId: string; text: string }
    isSelected: boolean
}

const CVLink: FC<CVLinkProps> = ({ link, isSelected }) => {
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef<HTMLSpanElement | null>(null)
    const t = useTranslations("header")
    const locale = useLocale()
    const cvPath = locale === 'en' ? '/cv/CV-Luis EspinozaEN.pdf' : '/cv/CV-Luis Espinoza.pdf'

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    return (
        <span key={link.sectionId} className={styles.cvWrapper} ref={wrapperRef}>
            <span 
                onClick={() => setOpen(v => !v)} 
                className={`${styles.option} ${isSelected ? styles.activeSection : ''}`}
            > 
                <span className={styles.optionText}>{t(link.text)}</span>
            </span>
            <div className={`${styles.cvDropdown} ${open ? styles.cvDropdownOpen : ''}`}>
                <a href={cvPath} download={cvPath} className={styles.cvLink}>{t('download_cv', { defaultMessage: 'Descargar CV' })}</a>
            </div>
        </span>
    )
}

// Componente separado para el enlace de trabajos
interface WorksLinkProps {
    link: { sectionId: string; text: string }
    isSelected: boolean
}

const WorksLink: FC<WorksLinkProps> = ({ link, isSelected }) => {
    const [open, setOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const wrapperRef = useRef<HTMLSpanElement | null>(null)
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const t = useTranslations("header")
    const { setActionSection } = useLandingStore()

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false)
                setIsHovered(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
        }
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovered(false)
        }, 150) // Pequeño delay para evitar que se cierre inmediatamente
    }

    const handleProjectClick = (projectName: string) => {
        setActionSection(Sections.WORKS)
        setOpen(false)
        setIsHovered(false)
        
        // Crear el ID del proyecto
        const projectId = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')
        
        // Navegar directamente al proyecto específico
        const projectElement = document.getElementById(projectId)
        if (projectElement) {
            projectElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            })
            // Actualizar el hash en la URL
            window.location.hash = projectId
        } else {
            // Si no encuentra el proyecto, navegar a la sección de trabajos
            const worksSection = document.getElementById(Sections.WORKS)
            if (worksSection) {
                worksSection.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    const isDropdownOpen = open || isHovered

    return (
        <span 
            key={link.sectionId} 
            className={styles.cvWrapper} 
            ref={wrapperRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span 
                onClick={() => setOpen(v => !v)} 
                className={`${styles.option} ${isSelected ? styles.activeSection : ''}`}
            > 
                <span className={styles.optionText}>{t(link.text)}</span>
            </span>
            <div className={`${styles.cvDropdown} ${isDropdownOpen ? styles.cvDropdownOpen : ''}`}>
                {projects.map((project, index) => (
                    <button 
                        key={index}
                        onClick={() => handleProjectClick(project.name)}
                        className={styles.worksLink}
                    >
                        {project.name}
                    </button>
                ))}
            </div>
        </span>
    )
}

export const Header = () => {
	const { links, actionSection, setActionSection } = useLandingStore()
	const { openContactModal } = useContactActions()
	const t = useTranslations("header")

	const goToHome = () => setActionSection(Sections.HOME)

	const navItems = links.map((link) => {
		const isSelected = actionSection === link.sectionId

		if (link.sectionId === Sections.CV) {
			return <CVLink key={link.sectionId} link={link} isSelected={isSelected} />
		}

		if (link.sectionId === Sections.WORKS) {
			return <WorksLink key={link.sectionId} link={link} isSelected={isSelected} />
		}

		const onClick = () => {
			if (link.sectionId === Sections.CONTACT) openContactModal()
			else setActionSection(link.sectionId as Sections)
		}

		return (
			<a
				key={link.sectionId}
				href={`#${link.sectionId}`}
				onClick={onClick}
				className={`${styles.option} ${isSelected ? styles.activeSection : ''}`}
			>
				{t(link.text)}
			</a>
		)
	})

	return (
		<header className={styles.headerBox}>
			<div className={styles.inner}>
				<a href={`#${Sections.HOME}`} onClick={goToHome} className={styles.brand}>
					<Image
						src="/images/header_photo2.png"
						alt="Luis Espinoza"
						width={72}
						height={72}
						className={styles.brandPhoto}
					/>
					<span className={styles.brandCopy}>
						<span className={styles.brandName}>Luis Espinoza</span>
						<span className={styles.brandRole}>{t('tagline')}</span>
					</span>
				</a>
				<nav className={styles.nav}>{navItems}</nav>
				<div className={styles.controls}>
					<LanguageSwitcher />
					<ThemeToggle />
				</div>
			</div>
		</header>
	)
}
