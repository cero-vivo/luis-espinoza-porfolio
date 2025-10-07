"use client"

import { useContactActions } from '@/model/landing-store'
import React from 'react'
import styles from "./contact-modal.module.css"
import { Modal } from '../basic/modal/modal'
import { CloseIcon } from '../basic/icons/close-icon'
import { EmailIcon } from '../basic/icons/email-icon'
import { WhatsappIcon } from '../basic/icons/whatsapp-icon'
import { PhoneIcon } from '../basic/icons/phone-icon'
import { LinkedinIcon } from '../basic/icons/linkedin-icon'
import Image from 'next/image'

export const ContactModal = () => {

	const { contactModalVisible, closeContactModal, sendMeEmail, sendMeWhatsapp, callMe, openLinkedin } = useContactActions()

	return (
		<Modal isOpen={contactModalVisible}>
			<article className={styles.modalCard}>
				<button type="button" className={styles.closeButton} onClick={closeContactModal} aria-label="Cerrar">
					<CloseIcon color={'var(--navyBlue)'} width={24} height={24} />
				</button>

				<section className={styles.hero}>
					<Image
						src="/images/header_photo2.png"
						alt="Luis Espinoza"
						width={60}
						height={60}
						className={styles.brandPhoto}
					/>
					<h2 className={styles.name}>Luis Espinoza</h2>
					<p className={styles.role}>AI-Driven Product Engineer</p>
					<p className={styles.tagline}>Me enfoco en experiencias web que conectan negocio y personas, con ciclos rápidos y colaboración cercana.</p>
				</section>

				<section className={styles.actionStack}>
					<button className={`${styles.contactTile} ${styles.emailTile}`} onClick={sendMeEmail}>
						<span className={styles.tileIcon}>
							<EmailIcon color={'currentColor'} width={26} height={26} />
						</span>
						<div className={styles.tileCopy}>
							<span className={styles.tileLabel}>Correo electrónico</span>
							<span className={styles.tileDetail}>luis.espinoza.nav@outlook.com</span>
						</div>
						<span className={styles.tileHint}>Tiempo de respuesta &lt; 1 día</span>
					</button>
					<div className={styles.secondaryTiles}>
						<button className={styles.contactTile} onClick={sendMeWhatsapp}>
							<span className={styles.tileIcon}>
								<WhatsappIcon color={'currentColor'} width={24} height={24} />
							</span>
							<div className={styles.tileCopy}>
								<span className={styles.tileLabel}>WhatsApp</span>
								<span className={styles.tileDetail}>+54 9 11 2388 1314</span>
							</div>
						</button>
						<button className={styles.contactTile} onClick={callMe}>
							<span className={styles.tileIcon}>
								<PhoneIcon color={'currentColor'} width={24} height={24} />
							</span>
							<div className={styles.tileCopy}>
								<span className={styles.tileLabel}>Llamada</span>
								<span className={styles.tileDetail}>+54 9 11 2388 1314</span>
							</div>
						</button>
						<button className={styles.contactTile} onClick={openLinkedin}>
							<span className={styles.tileIcon}>
								<LinkedinIcon color={'currentColor'} width={24} height={24} />
							</span>
							<div className={styles.tileCopy}>
								<span className={styles.tileLabel}>LinkedIn</span>
								<span className={styles.tileDetail}>/in/luis-espinoza-dev</span>
							</div>
						</button>
					</div>
				</section>

				<footer className={styles.footer}>
					<p className={styles.footerNote}>¿Quieres coordinar una videollamada? Mandame un mensaje y elegimos un horario.</p>
				</footer>
			</article>
		</Modal>
	)
}
