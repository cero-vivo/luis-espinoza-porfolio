import { LanguageSwitcher } from "@/components/basic/language-switcher/language-switcher";
import { Ethos } from "@/components/pages/ethos/ethos";
import { Landing } from "@/components/pages/landing/landing";
import { Skills } from "@/components/pages/skills/skills";
import { Works } from "@/components/pages/works/works";
import { Footer } from "@/components/shared/footer/footer";
import { useTranslations } from "next-intl";

export default function Home() {
	const t = useTranslations("landing")
	return (
		<main>
			<Landing />
			<Skills/>
			<Works/>
			<Ethos />
			<Footer/>
		</main>
  )
}