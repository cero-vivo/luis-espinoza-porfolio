import { Sections } from '@/types/constant'
import { HeaderOptionType } from '@/types/types'
import { create } from 'zustand'
import { useTrackEvent } from '@/hooks/useAnalytics'

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
			downloadLink: "cv/CV-LuisEspinoza.pdf"
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

// Hook personalizado para usar las funciones del store con seguimiento
export const useContactActions = () => {
	const track = useTrackEvent()
	const store = useLandingStore()

	return {
		...store,
		openContactModal: () => {
			track('contact_modal_opened', {
				action: 'open_modal',
				modal_type: 'contact'
			})
			store.openContactModal()
		},
		closeContactModal: () => {
			track('contact_modal_closed', {
				action: 'close_modal',
				modal_type: 'contact'
			})
			store.closeContactModal()
		},
		sendMeEmail: () => {
			track('contact_method_clicked', {
				contact_method: 'email',
				contact_value: 'luis.espinoza.nav@outlook.com'
			})
			store.sendMeEmail()
		},
		sendMeWhatsapp: () => {
			track('contact_method_clicked', {
				contact_method: 'whatsapp',
				contact_value: '+5491123881314'
			})
			store.sendMeWhatsapp()
		},
		callMe: () => {
			track('contact_method_clicked', {
				contact_method: 'phone',
				contact_value: '+54 9 11 2388-1314'
			})
			store.callMe()
		},
		openLinkedin: () => {
			track('contact_method_clicked', {
				contact_method: 'linkedin',
				contact_value: '/in/luis-espinoza-dev'
			})
			store.openLinkedin()
		}
	}
}
