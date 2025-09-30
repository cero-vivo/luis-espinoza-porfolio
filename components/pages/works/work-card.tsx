"use client"

import React, { FC, useEffect, useRef, useState } from 'react'
import { Heading } from '@/components/basic/heading/heading'
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { TechStack } from '@/components/shared/tech-stack/tech-stack'
import ExternalLinkIcon from '@/components/basic/icons/external-link-icon'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import styles from "./work-card.module.css"
import { ProjectType } from './projects-data'

interface WorkCardProps {
    work: ProjectType
    projectId: string
}

export const WorkCard: FC<WorkCardProps> = ({ work, projectId }) => {
    const t = useTranslations('works')
    const galleryRef = useRef<HTMLDivElement | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const rawHighlights = t(`projects.${work.name}.highlights`)
    const highlightItems = rawHighlights.split('|').map((item) => item.trim()).filter(Boolean)

    const badge = t(`projects.${work.name}.badge`)
    const result = t(`projects.${work.name}.result`)
    const metaRole = t(`projects.${work.name}.meta.role`, { defaultMessage: '' })
    const metaTimeline = t(`projects.${work.name}.meta.timeline`, { defaultMessage: '' })

    const scrollGallery = (direction: 'left' | 'right') => {
        const total = work.images.length
        if (total === 0) return
        setActiveIndex(prev => {
            const nextIndex = direction === 'left'
                ? (prev - 1 + total) % total
                : (prev + 1) % total
            return nextIndex
        })
    }

    const getLinkLabel = (url: string) => {
        if (url.includes('apple.com')) return t('links.app_store')
        if (url.includes('play.google')) return t('links.play_store')
        if (url.includes('github.com')) return t('links.github')
        return t('links.visit')
    }

    const externalLinks = work.urls.map((url) => (
        <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkPill}
        >
            <ExternalLinkIcon color={'currentColor'} width={18} height={18} />
            <span>{getLinkLabel(url)}</span>
        </a>
    ))

    const hasLinks = externalLinks.length > 0

    useEffect(() => {
        const container = galleryRef.current
        if (!container) return
        const images = Array.from(container.children) as HTMLElement[]
        const target = images[activeIndex]
        if (!target) return

        const containerCenter = container.clientWidth / 2
        const targetCenter = target.offsetLeft + target.clientWidth / 2
        const rawScrollLeft = targetCenter - containerCenter
        const maxScroll = container.scrollWidth - container.clientWidth
        const nextScrollLeft = Math.max(0, Math.min(rawScrollLeft, maxScroll))

        container.scrollTo({ left: nextScrollLeft, behavior: 'smooth' })
    }, [activeIndex])

    useEffect(() => {
        if (work.images.length <= 1) return
        const intervalId = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % work.images.length)
        }, 5000)
        return () => clearInterval(intervalId)
    }, [work.images.length])

    useEffect(() => {
        setActiveIndex(0)
    }, [work.images.length])

    return (
        <article className={styles.cardBox} id={projectId}>
            <div className={styles.cardInner}>
                <div className={styles.caseContent}>
                    <span className={styles.caseBadge}>{badge}</span>
                    <Heading text={t(`projects.${work.name}.name`)} variant='h3' classes={styles.caseTitle} />
                    <Paragraph text={t(`projects.${work.name}.description`)} variant='regular' classes={styles.caseDescription} />
                    {highlightItems.length > 0 && (
                        <ul className={styles.highlightList}>
                            {highlightItems.map((item, index) => (
                                <li key={`${work.name}-highlight-${index}`} className={styles.highlightItem}>
                                    <span aria-hidden className={styles.highlightDot} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    {(metaRole || metaTimeline) && (
                        <div className={styles.metaRow}>
                            {metaRole && (
                                <span className={styles.metaBadge}>
                                    <span className={styles.metaLabel}>{t('meta_labels.role')}</span>
                                    <span className={styles.metaValue}>{metaRole}</span>
                                </span>
                            )}
                            {metaTimeline && (
                                <span className={styles.metaBadge}>
                                    <span className={styles.metaLabel}>{t('meta_labels.timeline')}</span>
                                    <span className={styles.metaValue}>{metaTimeline}</span>
                                </span>
                            )}
                        </div>
                    )}
                    <div className={styles.caseFooter}>
                        <div className={styles.stackGroup}>
                            <span className={styles.stackLabel}>{t('stack_label')}</span>
                            <TechStack icons={work.icons} boxClasses={styles.techStack} iconClasses={styles.techIcon} />
                        </div>
                        {hasLinks && (
                            <div className={styles.linksBox}>
                                {externalLinks}
                            </div>
                        )}
                    </div>
                    <span className={styles.caseResult}>{result}</span>
                </div>
                <div className={styles.caseGallery}>
                    <button type="button" className={styles.galleryButton} onClick={() => scrollGallery('left')} aria-label={t('gallery.prev')}>
                        <Image src={'/icons/button-triangle.svg'} alt="Previous" width={36} height={36} />
                    </button>
                    <div className={styles.galleryStrip} ref={galleryRef}>
                        {work.images.map((image, index) => (
                            <Image
                                key={`${work.name}-image-${index}`}
                                src={image}
                                alt={`${work.name} screenshot ${index + 1}`}
                                className={styles.galleryImage}
                                loading='lazy'
                                width={640}
                                height={420}
                                quality={95}
                                sizes="(max-width: 768px) 82vw, (max-width: 1200px) 60vw, 520px"
                            />
                        ))}
                    </div>
                    <button type="button" className={styles.galleryButton} onClick={() => scrollGallery('right')} aria-label={t('gallery.next')}>
                        <Image src={'/icons/button-triangle.svg'} alt="Next" width={36} height={36} className={styles.buttonRotate} />
                    </button>
                </div>
            </div>
        </article>
    )
}
