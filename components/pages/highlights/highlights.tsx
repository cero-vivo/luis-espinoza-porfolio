'use client'

import { Frame } from '@/components/basic/frame/frame'
import { Heading } from '@/components/basic/heading/heading'
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { Sections } from '@/types/constant'
import { useTranslations } from 'next-intl'
import styles from './highlights.module.css'

const proofKeys = ['0', '1', '2'] as const

export const Highlights = () => {
  const t = useTranslations('highlights')

  const proofs = proofKeys.map((key) => ({
    eyebrow: t(`items.${key}.eyebrow`),
    value: t(`items.${key}.value`),
    description: t(`items.${key}.description`),
  }))

  return (
    <Frame id={Sections.HIGHLIGHTS} classes={styles.highlightsFrame}>
      <section className={styles.sectionHeader}>
        <span className={styles.overline}>{t('overline')}</span>
        <Heading variant="h2" text={t('title')} />
        <Paragraph variant="regular" text={t('intro')} classes={styles.subtitle} />
      </section>
      <div className={styles.proofGrid}>
        {proofs.map((item) => (
          <article key={`${item.eyebrow}-${item.value}`} className={styles.proofCard}>
            <span className={styles.proofEyebrow}>{item.eyebrow}</span>
            <h3 className={styles.proofValue}>{item.value}</h3>
            <Paragraph variant="regular" text={item.description} classes={styles.proofDescription} />
          </article>
        ))}
      </div>
    </Frame>
  )
}
