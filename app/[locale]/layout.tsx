import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import AnalyticsProvider from '@/components/analytics-provider';


const poppins = Poppins({
	weight: ["400", "500", "600", "700", "800"],
	subsets: ["latin"]
});

const metadataByLocale: Record<string, { title: string; description: string }> = {
	es: {
		title: "Luis Espinoza | Senior React Native Engineer",
		description: "Portfolio de Luis Espinoza: Senior React Native Engineer con experiencia en FinTech, arquitectura mobile y entrega asistida por IA para productos en producción.",
	},
	en: {
		title: "Luis Espinoza | Senior React Native Engineer",
		description: "Portfolio of Luis Espinoza: Senior React Native Engineer with experience in mobile products, FinTech, architecture and AI-enabled delivery for production systems.",
	},
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
	const content = metadataByLocale[locale] ?? metadataByLocale.en

	return {
		title: content.title,
		description: content.description,
		icons: {
			icon: [
				{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
				{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
				{ url: '/favicon.ico', sizes: 'any' }
			],
			apple: '/apple-touch-icon.png',
			other: [
				{ rel: 'manifest', url: '/site.webmanifest' }
			]
		},
	};
}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string }; }) {
	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages()

	return (
		<html lang={locale} className="root-colors light">
			<body className={poppins.className}>
				<NextIntlClientProvider messages={messages}>
					{children}
					{/* Analytics global */}
					<AnalyticsProvider />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
