'use client'

import { Frame } from '@/components/basic/frame/frame'
import { Heading } from '@/components/basic/heading/heading'
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { Button } from '@/components/basic/button/button'
import { useContactActions } from '@/model/landing-store'
import { Sections } from '@/types/constant'
import { useTranslations } from 'next-intl'
import styles from './highlights.module.css'

const recognitionKeys = ['0', '1', '2'] as const

export const Highlights = () => {
  const t = useTranslations('highlights')
  const { openContactModal } = useContactActions()

  const clients = t('clients.list').split('|').map((client) => client.trim()).filter(Boolean)
  const recognitions = recognitionKeys.map((key) => ({
    title: t(`recognitions.items.${key}.title`),
    description: t(`recognitions.items.${key}.description`),
    year: t(`recognitions.items.${key}.year`),
  }))

  return (
    <Frame id={Sections.HIGHLIGHTS} classes={styles.highlightsFrame}>
      <section className={styles.sectionHeader}>
        <span className={styles.overline}>{t('overline')}</span>
        <Heading variant="h2" text={t('title')} />
        <Paragraph variant="regular" text={t('intro')} classes={styles.subtitle} />
      </section>

      <section className={styles.clientSection}>
        <div className={styles.clientHeader}>
          <h3 className={styles.sectionTitle}>{t('clients.title')}</h3>
          <Paragraph variant="regular" text={t('clients.subtitle')} classes={styles.sectionSubtitle} />
        </div>
        <ul className={styles.clientGrid}>
          {clients.map((client) => (
            <li key={client} className={styles.clientBadge}>{client}</li>
          ))}
        </ul>
      </section>

      <section className={styles.recognitionSection}>
        <div className={styles.recognitionHeader}>
          <h3 className={styles.sectionTitle}>{t('recognitions.title')}</h3>
          <Paragraph variant="regular" text={t('recognitions.subtitle')} classes={styles.sectionSubtitle} />
        </div>
        <div className={styles.recognitionGrid}>
          {recognitions.map((item) => (
            <article key={`${item.year}-${item.title}`} className={styles.recognitionCard}>
              <span className={styles.recognitionYear}>{item.year}</span>
              <h4 className={styles.recognitionTitle}>{item.title}</h4>
              <Paragraph variant="regular" text={item.description} classes={styles.recognitionDescription} />
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaCard}>
        <div className={styles.ctaCopy}>
          <h3 className={styles.ctaTitle}>{t('cta.title')}</h3>
          <Paragraph variant="regular" text={t('cta.body')} classes={styles.ctaDescription} />
        </div>
        <Button text={t('cta.button')} onClick={openContactModal} classes={styles.ctaButton} />
      </section>
    </Frame>
  )
}
