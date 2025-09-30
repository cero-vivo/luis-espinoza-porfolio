import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import AnalyticsProvider from '@/components/analytics-provider';
import { CookieBanner } from '@/components/basic/cookie-banner/cookie-banner';


const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin-ext"]
});

export const metadata: Metadata = {
	title: "Luis Espinoza",
	description: "Luis Espinoza - Software develop dev react react native mobile app web app argentina chile latam web frontend fullstack",
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

// Desactiva el zoom/pinch en dispositivos móviles
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
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
