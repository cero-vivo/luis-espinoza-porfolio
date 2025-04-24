import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';


const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin-ext"]
});

export const metadata: Metadata = {
	title: "Luis Espinoza",
	description: "Luis Espinoza - Software develop dev react react native mobile app web app argentina chile latam web frontend fullstack",
};

export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string }; }) {
	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages()

	return (
		<html lang={locale} className="root-colors">
			<body className={poppins.className}>
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
