import { Sections } from '@/types/constant'
import { HeaderOptionType } from '@/types/types'
import { create } from 'zustand'


interface LandingUIState {
	contactModalVisible: boolean
	openContactModal: () => void
	closeContactModal: () => void
	//header
	links: HeaderOptionType[],
	actionSection: Sections,
	setActionSection: (section: Sections) => void
}

export const useLandingStore = create<LandingUIState>()((set, get) => ({
	//header
	actionSection: Sections.HOME,
	setActionSection: (section: Sections) => set({ actionSection: section }),
	links: [
		{
			sectionId: Sections.SKILLS,
			text: "header_skills"
		},
		{
			sectionId: Sections.WORKS,
			text: "header_works"
		},
		{
			sectionId: Sections.ETHOS,
			text: "header_ethos"
		},
		{
			sectionId: Sections.CONTACT,
			text: "header_contact"
		},
		{
			sectionId: Sections.CV,
			text: "header_cv",
			downloadLink: "cv/CV_Luis_Espinoza_Mobile_&_Web_Developer.pdf"
		}
	],
	//contact modal
	contactModalVisible: false,
	openContactModal: () => set({ contactModalVisible: true }),
	closeContactModal: () => set({ contactModalVisible: false })
}))
