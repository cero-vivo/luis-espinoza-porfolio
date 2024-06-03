import { TechIcon } from "@/components/shared/tech-stack/tech-index";

export interface ProjectType {
	name: string;
	description: string;
	icons: TechIcon[];
	images: string[];
	urls: string[]
}

export const projects: ProjectType[] = [
	{
		"name": "Lux Ater",
		"description": "Designed and developed Lux Ater, a philosophy and poetry blog for a writer. Utilized Next.js for the framework, CSS Modules for styling, Firebase for database and authentication, and Markdown for content formatting. The project features a clean and intuitive interface, efficient content publishing, and robust scalability and security.",
		"icons": ["typescript", "next", "css3", "firebase", "netlify"],
		"images": [
			"./projects/luxater/1.png",
			"./projects/luxater/2.png",
			"./projects/luxater/3.png",
			"./projects/luxater/4.png"
		],
		"urls": ["https://www.luxater.blog"]
	},
	{
		"name": "Hybeans App",
		"description": "Contributed to the development of various key functionalities of the application, including login, password recovery, account validation, multiple profile types, feeds, notifications, configuration menus, bookings, product sales, hiring, and tour generation using map services, and much more.",
		"icons": ["react", "typescript", "mst", "firebase", "css3"],
		"images": [
			"./projects/hyApp/1.png",
			"./projects/hyApp/2.png",
			"./projects/hyApp/3.png",
			"./projects/hyApp/4.png",
			"./projects/hyApp/5.png",
			"./projects/hyApp/6.png",
			"./projects/hyApp/7.png",
			"./projects/hyApp/8.png",
			"./projects/hyApp/9.png",
			"./projects/hyApp/10.png"
		],
		"urls": ["https://play.google.com/store/apps/details?id=com.hybeans", "https://apps.apple.com/ar/app/hybeans/id1588248966"]
	},
	{
		"name": "Filoweb",
		"description": "Educational site that traces the history of western philosophy, from the pre-socratic schools to the postmodern ones, showing its main currents and exponents in a beautiful way.",
		"icons": ["javascript", "react", "css3", "html5"],
		"images": [
			"./projects/Webfilo/1.png",
			"./projects/Webfilo/2.png",
			"./projects/Webfilo/3.png",
			"./projects/Webfilo/4.png",
			"./projects/Webfilo/5.png",
			"./projects/Webfilo/6.png",
			"./projects/Webfilo/7.png",
			"./projects/Webfilo/8.png",
			"./projects/Webfilo/9.png",
			"./projects/Webfilo/10.png"
		],
		urls: []
	},
	{
		"name": "Hybeans Web",
		"description": "As part of my contributions to the continuous development of the Hybeans website, I also played a key role in implementing various functionalities of the application. These included profile types, bookings, the checkout process, landing page, and more.",
		"icons": ["react", "typescript", "mst", "firebase", "css3"],
		"images": [
			"./projects/hyWeb/1.png",
			"./projects/hyWeb/2.png",
			"./projects/hyWeb/3.png",
			"./projects/hyWeb/4.png",
			"./projects/hyWeb/5.png",
			"./projects/hyWeb/6.png",
			"./projects/hyWeb/7.png",
			"./projects/hyWeb/8.png",
			"./projects/hyWeb/9.png",
			"./projects/hyWeb/10.png",
			"./projects/hyWeb/11.png",
			"./projects/hyWeb/12.png"
		],
		"urls": ["https://www.hybeans.com"]
	},
	{
		"name": "Jardin Management CPanel",
		"description": "Commercial web application built to manage the inventory of a local second hand clothing store, with it the store employees can enter products, modify them, delete them and perform specific searches. A secured API is implemented with query, pagination, login and crud services. ",
		"icons": ["javascript", "react", "css3", "java", "springboot", "jwt", "postgres", "amazon", "heroku"],
		"images": [
			"./projects/JardinApp/web/1.png",
			"./projects/JardinApp/web/2.png",
			"./projects/JardinApp/web/3.png",
			"./projects/JardinApp/web/4.png",
			"./projects/JardinApp/web/5.png",
			"./projects/JardinApp/web/6.png",
			"./projects/JardinApp/web/7.png",
			"./projects/JardinApp/web/8.png"
		],
		urls: []
	},
	{
		"name": "Your Lists App",
		"description": "Web application for personal use created to use lists, as reminders, as a to-do list, as steps for recipes, etc, anything you can think of. In it you can manage the lists in folders to differentiate and order them.",
		"icons": ["javascript", "react", "material", "css3", "java", "springboot", "postgres", "heroku"],
		"images": [
			"./projects/YourListsApp/1.png",
			"./projects/YourListsApp/2.png",
			"./projects/YourListsApp/3.png"
		],
		urls: []
	}
]