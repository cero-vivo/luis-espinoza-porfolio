import { FC, SVGProps } from 'react'
import { Heading } from '@/components/basic/heading/heading'
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { TechStack } from '@/components/shared/tech-stack/tech-stack'
import ExternalLinkIcon from '@/components/basic/icons/external-link-icon'
import { useTranslations } from 'next-intl'
import styles from "./work-card.module.css"
import { ProjectType } from './projects-data'
import { WorkGallery } from './work-gallery'

interface WorkCardProps {
    work: ProjectType
    projectId: string
}

type DetailIconName = 'impact' | 'role' | 'timeline'

const DetailIcon = ({ name, ...props }: SVGProps<SVGSVGElement> & { name: DetailIconName }) => {
    if (name === 'impact') {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
                <path d="M4 17.5V6.5" />
                <path d="M4 17.5H19.5" />
                <path d="M7.5 14l3-3 2.5 2.5 5-6" />
                <path d="M15.5 7.5H18v2.5" />
            </svg>
        )
    }

    if (name === 'timeline') {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
                <rect x="3.5" y="5.5" width="17" height="15" rx="3.5" />
                <path d="M7.5 3.5V7.5" />
                <path d="M16.5 3.5V7.5" />
                <path d="M3.5 10H20.5" />
            </svg>
        )
    }

    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="8.25" r="3.25" />
            <path d="M5 19c1.4-3.2 4-4.8 7-4.8s5.6 1.6 7 4.8" />
        </svg>
    )
}

export const WorkCard: FC<WorkCardProps> = ({ work, projectId }) => {
    const t = useTranslations('works')

    const rawHighlights = t(`projects.${work.name}.highlights`)
    const highlightItems = rawHighlights.split('|').map((item) => item.trim()).filter(Boolean)

    const badge = t(`projects.${work.name}.badge`)
    const result = t(`projects.${work.name}.result`, { defaultMessage: '' })
    const metaRole = t(`projects.${work.name}.meta.role`, { defaultMessage: '' })
    const metaTimeline = t(`projects.${work.name}.meta.timeline`, { defaultMessage: '' })

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

    return (
        <article className={styles.cardBox} id={projectId}>
            <div className={styles.cardInner}>
                <div className={styles.caseIntro}>
                    <span className={styles.caseBadge}>{badge}</span>
                    <Heading text={t(`projects.${work.name}.name`)} variant='h3' classes={styles.caseTitle} />
                    <Paragraph text={t(`projects.${work.name}.description`)} variant='regular' classes={styles.caseDescription} />
                </div>
                <WorkGallery
                    images={work.images}
                    projectName={work.name}
                    prevLabel={t('gallery.prev')}
                    nextLabel={t('gallery.next')}
                />
                <div className={styles.caseDetails}>
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
                    {result && (
                        <div className={styles.resultBanner}>
                            <span aria-hidden className={styles.resultIcon}>
                                <DetailIcon name="impact" width={22} height={22} />
                            </span>
                            <p className={styles.caseResult}>{result}</p>
                        </div>
                    )}
                    {(metaRole || metaTimeline) && (
                        <div className={styles.metaRow}>
                            {metaRole && (
                                <span className={styles.metaBadge}>
                                    <span aria-hidden className={styles.metaIcon}>
                                        <DetailIcon name="role" width={20} height={20} />
                                    </span>
                                    <span className={styles.metaCopy}>
                                        <span className={styles.metaLabel}>{t('meta_labels.role')}</span>
                                        <span className={styles.metaValue}>{metaRole}</span>
                                    </span>
                                </span>
                            )}
                            {metaTimeline && (
                                <span className={styles.metaBadge}>
                                    <span aria-hidden className={styles.metaIcon}>
                                        <DetailIcon name="timeline" width={20} height={20} />
                                    </span>
                                    <span className={styles.metaCopy}>
                                        <span className={styles.metaLabel}>{t('meta_labels.timeline')}</span>
                                        <span className={styles.metaValue}>{metaTimeline}</span>
                                    </span>
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
                </div>
            </div>
        </article>
    )
}
