import { LanguageSwitcher } from "@/components/basic/language-switcher/language-switcher";
import { ContactModal } from "@/components/modals/contact-modal";
import { ThemeToggle } from "@/components/basic/theme-toggle/theme-toggle";
import { Ethos } from "@/components/pages/ethos/ethos";
import { Landing } from "@/components/pages/landing/landing";
import { Skills } from "@/components/pages/skills/skills";
import { Works } from "@/components/pages/works/works";
import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";

export default function Home() {
	return (
		<main>
			<Header />
			<LanguageSwitcher/>
			<ThemeToggle />
			<Landing />
			<Works/>
			<Skills/>
			<Ethos />
			<Footer/>
			<ContactModal/>
		</main>
  )
}