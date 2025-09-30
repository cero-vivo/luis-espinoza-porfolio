import { ContactModal } from "@/components/modals/contact-modal";
import { Ethos } from "@/components/pages/ethos/ethos";
import { Landing } from "@/components/pages/landing/landing";
import { Skills } from "@/components/pages/skills/skills";
import { Works } from "@/components/pages/works/works";
import { Highlights } from "@/components/pages/highlights/highlights";
import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";
import { CookieBanner } from "@/components/basic/cookie-banner/cookie-banner";

export default function Home() {
	return (
		<main style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
			<Header />
			<Landing />
			<Works/>
			<Highlights />
			<Skills/>
			<Ethos />
			<Footer/>
			<ContactModal/>
			<CookieBanner />
		</main>
  )
}
