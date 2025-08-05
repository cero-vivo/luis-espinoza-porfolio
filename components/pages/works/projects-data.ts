import { TechIcon } from "@/components/shared/tech-stack/tech-index";

export interface ProjectType {
	name: string;
	icons: TechIcon[];
	images: string[];
	urls: string[]
}

export const projects: ProjectType[] = [
	{
		"name": "Pago Fácil & Western Union",
		"icons": ["typescript", "react", "firebase", "redux", "amazon"],
		"images": [
			"/projects/pagoFacil/1.png",
			"/projects/pagoFacil/2.png",
			"/projects/pagoFacil/4.png",
			"/projects/pagoFacil/9.png",
			"/projects/pagoFacil/5.png",
			"/projects/pagoFacil/3.png",
			"/projects/pagoFacil/6.png",
			"/projects/pagoFacil/7.png",
			"/projects/pagoFacil/8.png",
		],
		"urls": ["https://apps.apple.com/ar/app/app-pago-f%C3%A1cil/id6443566167", "https://play.google.com/store/apps/details?id=com.westernunionwallet&hl=en-US"]
	},
	{
		"name": "0-Registros",
		"icons": ["typescript", "next", "css3", "firebase", "netlify", "p5js"],
		"images": [
			"/projects/0-registros/1.png",
			"/projects/0-registros/2.png",
			"/projects/0-registros/3.png",
			"/projects/0-registros/4.png",
			"/projects/0-registros/6.png",
			"/projects/0-registros/7.png",
			"/projects/0-registros/8.png"
		],
		"urls": ["https://www.0-registros.art"]
	},
	{
		"name": "Hybeans App",
		"icons": ["react", "typescript", "mst", "firebase", "css3"],
		"images": [
			"/projects/hyApp/1.png",
			"/projects/hyApp/2.png",
			"/projects/hyApp/3.png",
			"/projects/hyApp/4.png",
			"/projects/hyApp/5.png",
			"/projects/hyApp/6.png",
			"/projects/hyApp/7.png",
			"/projects/hyApp/8.png",
			"/projects/hyApp/9.png",
			"/projects/hyApp/10.png"
		],
		"urls": ["https://play.google.com/store/apps/details?id=com.hybeans", "https://apps.apple.com/ar/app/hybeans/id1588248966"]
	},
	{
		"name": "Filoweb",
		"icons": ["javascript", "react", "css3", "html5"],
		"images": [
			"/projects/Webfilo/1.png",
			"/projects/Webfilo/2.png",
			"/projects/Webfilo/3.png",
			"/projects/Webfilo/4.png",
			"/projects/Webfilo/5.png",
			"/projects/Webfilo/6.png",
			"/projects/Webfilo/7.png",
			"/projects/Webfilo/8.png",
			"/projects/Webfilo/9.png",
			"/projects/Webfilo/10.png"
		],
		urls: ["https://luisterceroiii.github.io/Web-Filosofia/"]
	},
	{
		"name": "Hybeans Web",
		"icons": ["react", "typescript", "mst", "firebase", "css3"],
		"images": [
			"/projects/hyWeb/1.png",
			"/projects/hyWeb/2.png",
			"/projects/hyWeb/3.png",
			"/projects/hyWeb/4.png",
			"/projects/hyWeb/5.png",
			"/projects/hyWeb/6.png",
			"/projects/hyWeb/7.png",
			"/projects/hyWeb/8.png",
			"/projects/hyWeb/9.png",
			"/projects/hyWeb/10.png",
			"/projects/hyWeb/11.png",
			"/projects/hyWeb/12.png"
		],
		"urls": ["https://www.hybeans.com"]
	},
	{
		"name": "AEG Hornos de Cerámica",
		"icons": ["next", "react", "typescript", "firebase", "netlify", "css3"],
		"images": [
			"/projects/hornos-aeg/1.png",
			"/projects/hornos-aeg/2.png",
			"/projects/hornos-aeg/3.png",
			"/projects/hornos-aeg/4.png"
		],
		"urls": ["https://hornos-aeg.netlify.app/"]
	},
	{
		"name": "Digital Consultora - Retail Spark Grow",
		"icons": ["javascript", "css3", "html5", "tailwind", "netlify", "react"],
		"images": [
			"/projects/retail-spark-grow/1.png",
			"/projects/retail-spark-grow/2.png",
			"/projects/retail-spark-grow/3.png",
			"/projects/retail-spark-grow/4.png"
		],
		"urls": ["https://retail-spark-grow.netlify.app/"]
	}
	/* {
		"name": "Jardin Management CPanel",
		"icons": ["javascript", "react", "css3", "java", "springboot", "jwt", "postgres", "amazon", "heroku"],
		"images": [
			"/projects/JardinApp/web/1.png",
			"/projects/JardinApp/web/2.png",
			"/projects/JardinApp/web/3.png",
			"/projects/JardinApp/web/4.png",
			"/projects/JardinApp/web/5.png",
			"/projects/JardinApp/web/6.png",
			"/projects/JardinApp/web/7.png",
			"/projects/JardinApp/web/8.png"
		],
		urls: []
	},
	{
		"name": "Your Lists App",
		"icons": ["javascript", "react", "material", "css3", "java", "springboot", "postgres", "heroku"],
		"images": [
			"/projects/YourListsApp/1.png",
			"/projects/YourListsApp/2.png",
			"/projects/YourListsApp/3.png"
		],
		urls: []
	} */
]