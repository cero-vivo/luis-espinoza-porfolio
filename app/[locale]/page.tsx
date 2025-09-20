import { LanguageSwitcher } from "@/components/basic/language-switcher/language-switcher";
import { ContactModal } from "@/components/modals/contact-modal";
import { ThemeToggle } from "@/components/basic/theme-toggle/theme-toggle";
import { Ethos } from "@/components/pages/ethos/ethos";
import { Landing } from "@/components/pages/landing/landing";
import { Skills } from "@/components/pages/skills/skills";
import { Works } from "@/components/pages/works/works";
import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";
import { CookieBanner } from "@/components/basic/cookie-banner/cookie-banner";
import { HorizontalPortfolio } from "@/components/layout/horizontal-portfolio/horizontal-portfolio";
import { InteractiveCursor } from "@/components/ui/interactive-cursor/interactive-cursor";

export default function Home() {
	return (
		<main style={{width: '100vw', height: '100vh', overflow: 'hidden'}}>
			{/* Interactive cursor */}
			<InteractiveCursor />
			
			{/* Fixed elements that stay on top */}
			<Header />
			<LanguageSwitcher/>
			<ThemeToggle />
			
			{/* Horizontal scrolling sections */}
			<HorizontalPortfolio>
				<Landing />
				<Works/>
				<Skills/>
				<Ethos />
			</HorizontalPortfolio>
			
			{/* Fixed elements */}
			<Footer/>
			<ContactModal/>
			<CookieBanner />
		</main>
  )
}