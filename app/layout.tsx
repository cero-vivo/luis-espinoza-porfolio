import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin-ext"]
});

export const metadata: Metadata = {
	title: "Luis Espinoza",
	description: "Luis Espinoza - Desarrollador de Software | Experto en React y React Native.\nSoy Luis Espinoza, un desarrollador de software especializado en la creación de aplicaciones web y móviles con React y React Native. Con una sólida formación en Filosofía e Informática y un enfoque autodidacta, ofrezco soluciones innovadoras y funcionales. Descubre mis proyectos y habilidades en desarrollo frontend y backend, y cómo mi pasión por la música y la lectura enriquecen mi enfoque creativo. Visita mi portafolio para conocer más sobre mi trabajo y colaboración en equipos de alto rendimiento.",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={poppins.className}>{children}</body>
		</html>
	);
}
