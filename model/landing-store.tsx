import { Sections } from '@/types/constant'
import { HeaderOptionType } from '@/types/types'
import { create } from 'zustand'


interface LandingUIState {
	//header
	links: HeaderOptionType[],
	actionSection: Sections,
	setActionSection: (section: Sections) => void

	//contact
	contactModalVisible: boolean
	openContactModal: () => void
	closeContactModal: () => void
	sendMeEmail: () => void
	sendMeWhatsapp: () => void,
	callMe: () => void,
	openLinkedin: () => void,

}

export const useLandingStore = create<LandingUIState>()((set, get) => ({
	//header
	actionSection: Sections.HOME,
	setActionSection: (section: Sections) => set({ actionSection: section }),
	links: [
		{
			sectionId: Sections.WORKS,
			text: "works"
		},
		{
			sectionId: Sections.SKILLS,
			text: "skills"
		},
		{
			sectionId: Sections.ETHOS,
			text: "ethos"
		},
		{
			sectionId: Sections.CONTACT,
			text: "contact"
		},
		{
			sectionId: Sections.CV,
			text: "cv",
			downloadLink: "cv/CV - Luis Espinoza - Developer.pdf"
		}
	],
	//contact modal
	contactModalVisible: false,
	openContactModal: () => set({ contactModalVisible: true }),
	closeContactModal: () => set({ contactModalVisible: false }),
	sendMeEmail: () => {
		const email = 'luis.espinoza.nav@outlook.com'
		const subject = 'De sitio Luis Espinoza'
		const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`
		window.open(mailtoLink, '_blank')

	},
	sendMeWhatsapp: () => {
		const phoneNumber = '+5491123881314'
		const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`
		window.open(whatsappLink, '_blank')

	},
	callMe: () => {
		const phoneNumber = '+54 9 11 2388-1314'
		const dialLink = `tel:${phoneNumber.replace(/\D/g, '')}`
		window.location.href = dialLink
	},
	openLinkedin: () => {
		const linkedInURL = 'https://www.linkedin.com/in/luis-espinoza-dev/'
		window.open(linkedInURL, '_blank')
	}
}))
