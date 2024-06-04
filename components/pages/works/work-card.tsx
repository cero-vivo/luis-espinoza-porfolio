"use client"

import React, { FC, useRef } from 'react'
import { Heading } from '@/components/basic/heading/heading'
import styles from "./work-card.module.css"
import { ProjectType } from './projects-data'
import { Paragraph } from '@/components/basic/paragraph/paragraph'
import { TechStack } from '@/components/shared/tech-stack/tech-stack'
import Image from 'next/image'
import ExternalLinkIcon from '@/components/basic/icons/external-link-icon'
import { colors } from '@/theme/colors'

interface WorkCardProps {
    work: ProjectType
}

export const WorkCard: FC<WorkCardProps> = (props) => {
    
    const { work } = props

    const worksRef = useRef(null)


    const scrollRight = () => {
        if (worksRef.current) {
            (worksRef.current as HTMLElement).scrollBy({
                left: 300,
                behavior: 'smooth'
            })
        }
    }
    const scrollLeft = () => {
        if (worksRef.current) {
            (worksRef.current as HTMLElement).scrollBy({
                left: -300,
                behavior: 'smooth'
            })
        }
    };

    const links = work.urls.map((url) => {
        const handleClick = () => {
            if (url) {
              window.open(url, "_blank", "noopener,noreferrer");
            }
          };
          return <ExternalLinkIcon 
                    key={url}
                    color={colors.navyBlue} 
                    width={20} 
                    height={20} 
                    classes={styles.externalLinkIcon} 
                    onClick={handleClick} 
                />
    })

    return (
        <div key={work.name} className={styles.cardBox}>
            <div className={styles.titleBox}>
                <Heading customTx={work.name} variant='h3' />
                <div className={styles.linksBox}>
                    {links}
                </div>
            </div>
            <div className={styles.slideBox}>
                <Image src={"/icons/button-triangle.svg"} width={40} height={40} alt={work.name} onClick={scrollLeft} className={styles.leftButton}/>
                <div className={styles.slideImagesBox} ref={worksRef}>
                    {work.images.map((image, index) => {
                        return <img key={index} src={image} alt={work.name} className={styles.slideImage} loading='lazy' />
                    })}
                </div>
                <Image src={"/icons/button-triangle.svg"} width={40} height={40} alt={work.name} onClick={scrollRight} className={styles.rightButton}/>
            </div>
            <TechStack icons={work.icons} boxClasses={styles.techStack} />
            <Paragraph customTx={work.description} variant='regular' classes={styles.paragraph} />
        </div>
    )
}
