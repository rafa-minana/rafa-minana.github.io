export interface PortfolioSection {
  id: string;
  file: string;
  icon: string;
  label: string;
}
export interface FocusArea {
  number: string;
  file: string;
  title: string;
  strapline: string;
  summary: string;
  detail: string;
  tools: string[];
}
export interface Experience {
  role: string;
  company: string;
  period: string;
  brief: string;
  details: string[];
}
export interface Project {
  number: string;
  name: string;
  category: string;
  description: string;
  stack: string;
  mark: string;
  links: { label: string; url: string }[];
}

export const portfolio = {
  name: "Rafael Miñana Jover",
  title: "Frontend Engineer · Angular",
  location: "Valencia, España",
  email: "minanajoverrafa@gmail.com",
  phone: "+34 670 237 321",
  phoneHref: "tel:+34670237321",
  linkedin: "https://www.linkedin.com/in/rminana/",
  github: "https://github.com/rafa-minana",
  summary:
    "Ingeniero de software con más de 7 años en el sector y más de 4 especializado en frontend con Angular, RxJS y signals. Mi trayectoria en backend y fullstack me da una visión completa del ciclo de desarrollo. Actualmente impulso la arquitectura frontend y los procesos de entrega, y cuando el equipo tiene una necesidad, busco cómo resolverla.",
  sections: [
    { id: "home", file: "home.ts", icon: "home", label: "Inicio" },
    {
      id: "what-i-do",
      file: "what-i-do.ts",
      icon: "code-xml",
      label: "Qué hago",
    },
    {
      id: "career",
      file: "career.ts",
      icon: "briefcase-business",
      label: "Trayectoria",
    },
    { id: "my-work", file: "work.ts", icon: "folder-code", label: "Proyectos" },
    { id: "skills", file: "skills.json", icon: "braces", label: "Tecnologías" },
    {
      id: "education",
      file: "education.yaml",
      icon: "graduation-cap",
      label: "Formación",
    },
    { id: "contact", file: "contact.css", icon: "at-sign", label: "Contacto" },
  ] satisfies PortfolioSection[],
  highlights: [
    { value: "7+", label: "años en software" },
    { value: "−70%", label: "testing manual" },
    { value: "−50%", label: "tiempos de build" },
  ],
  focus: [
    {
      number: "01",
      file: "release.flow.ts",
      title: "Git, versionado y releases",
      strapline: "Un flujo de entrega predecible",
      summary:
        "Definí el flujo de trabajo Git y la estrategia de versionado (SemVer) del nuevo producto, coordinando y adaptándolo a las necesidades de Producto.",
      detail:
        "Automaticé la creación de tags y releases en GitHub, aumentando la productividad del equipo en torno a un 60%.",
      tools: ["Git", "SemVer", "GitHub Actions", "Releases", "CI/CD"],
    },
    {
      number: "02",
      file: "frontend.ts",
      title: "Arquitectura frontend",
      strapline: "Aplicaciones Angular que escalan",
      summary:
        "Diseño interfaces y arquitectura de producto para equipos que necesitan avanzar sin perder calidad.",
      detail:
        "Angular 22, RxJS, signals y librerías internas reutilizables. Participé en la división de una aplicación en cinco paquetes npm, reduciendo los tiempos de build más de un 50 %.",
      tools: ["Angular", "TypeScript", "RxJS", "signals", "Ionic", "npm"],
    },
    {
      number: "03",
      file: "automation.ts",
      title: "Iniciativa propia",
      strapline: "Detectar una necesidad y resolverla",
      summary:
        "Cuando el equipo necesita algo que no existe, lo propongo y lo construyo. El testing manual estaba frenando las entregas, así que busqué la forma de automatizarlo.",
      detail:
        "Monté un framework E2E con Playwright, Stagehand y agentes LLM, integrado en GitHub Actions, para que QA pudiera automatizar sus casos. Hoy corre en cada PR y redujo el testing manual más de un 70 %.",
      tools: [
        "Playwright",
        "Stagehand",
        "LLM agents",
        "GitHub Actions",
        "TypeScript",
      ],
    },
    {
      number: "04",
      file: "leadership.ts",
      title: "Liderazgo de equipo",
      strapline: "Coordinación de punta a punta",
      summary:
        "Coordino arquitectura, planificación y procesos de entrega con Producto, QA, diseño y backend.",
      detail:
        "Fui Squad Lead durante seis meses de un equipo responsable de un módulo del producto; cumplimos la mayor parte de los objetivos de entrega previstos.",
      tools: ["Squad Lead", "Planificación", "Jira", "Docker"],
    },
  ] satisfies FocusArea[],
  experience: [
    {
      role: "Frontend Developer",
      company: "Imperia SCM",
      period: "Abril 2024 – Actualidad",
      brief:
        "Arquitectura Angular, automatización de QA con IA y entregas más rápidas para un producto SaaS.",
      details: [
        "Diseñé un framework E2E con TypeScript, Playwright y Stagehand: QA escribe casos en lenguaje natural y un agente LLM los ejecuta sobre el SaaS. Lo integré en GitHub Actions con smoke tests en cada PR y reportes estilo Allure; redujo el testing manual más de un 70 %.",
        "Abordé el rol de Squad Lead de un equipo responsable de un módulo del producto; cumplimos la mayor parte de los objetivos de entrega previstos.",
        "Definí el flujo Git y la estrategia SemVer del nuevo producto con Producto. Automaticé tags y releases en GitHub, aumentando la productividad en torno a un 60 %.",
        "Participé en la división de la aplicación Angular en cinco librerías npm internas, con builds más de un 50 % más rápidos y código reutilizable.",
        "Desarrollo nuevas funcionalidades del SaaS con Angular 22, RxJS y signals junto a backend y diseño.",
      ],
    },
    {
      role: "Fullstack Developer",
      company: "VickyFoods Products S.L.",
      period: "Junio 2022 – Abril 2024",
      brief: "Producto móvil, ERP y APIs para sistemas internos.",
      details: [
        "Desarrollé una aplicación móvil con Angular e Ionic.",
        "Mantuve el ERP con Angular y Ext JS en frontend y PHP en backend.",
        "Desarrollé APIs PHP sobre MongoDB y PostgreSQL, e integré datos en Power BI.",
        "Refactoricé consultas SQL para mejorar el rendimiento de las aplicaciones.",
      ],
    },
    {
      role: "Backend Developer",
      company: "Odec Centro de Cálculo",
      period: "Febrero 2019 – Mayo 2022",
      brief:
        "Modernización Java y automatizaciones Python para datos y documentación.",
      details: [
        "Migré proyectos Java de EJB a Quarkus e implementé nuevos endpoints.",
        "Automaticé la lectura de ficheros JSON y Excel con Python y pandas.",
        "Desarrollé scripts Python para medir y comparar el rendimiento del servidor.",
        "Creé un generador de documentación de API con Python y Slate, desplegado en Docker.",
      ],
    },
  ] satisfies Experience[],
  projects: [
    {
      number: "01",
      name: "Vep Inmobiliaria",
      category: "Web fullstack · automatización",
      description:
        "Web para una empresa local con contenido actualizado automáticamente mediante scraping.",
      stack:
        "Astro, Python, FastAPI, base de datos relacional, Docker, web scraping",
      mark: "VEP",
      links: [{ label: "Visitar web", url: "https://vepinmobiliaria.com/" }],
    },
    {
      number: "02",
      name: "ts-useful-types",
      category: "Open source · TypeScript",
      description:
        "Librería pública de tipos reutilizables para proyectos TypeScript.",
      stack: "TypeScript, npm, GitHub, tipos genéricos",
      mark: "TYPES",
      links: [
        { label: "npm", url: "https://www.npmjs.com/package/ts-useful-types" },
        {
          label: "GitHub",
          url: "https://github.com/rafa-minana/ts-useful-types",
        },
      ],
    },
    {
      number: "03",
      name: "LeetCode Problems",
      category: "Algoritmos · estructuras de datos",
      description:
        "Resolución de problemas de algoritmos y estructuras de datos en Python y Java.",
      stack: "Python, Java, algoritmos, estructuras de datos",
      mark: "CODE",
      links: [
        {
          label: "GitHub",
          url: "https://github.com/rafa-minana/leetCodeProblems",
        },
      ],
    },
  ] satisfies Project[],
  skills: [
    {
      group: "Frontend",
      items: ["Angular", "TypeScript", "RxJS", "signals", "Ionic", "Astro"],
    },
    {
      group: "Backend",
      items: ["Java", "Quarkus", "Python", "FastAPI", "PHP"],
    },
    { group: "Bases de datos", items: ["PostgreSQL", "MongoDB", "SQL"] },
    {
      group: "Testing e IA",
      items: [
        "Playwright",
        "Stagehand",
        "Agentes LLM",
        "OpenAI",
        "Anthropic",
        "Google",
      ],
    },
    {
      group: "DevOps y herramientas",
      items: ["Git", "GitHub Actions", "Docker", "npm", "Jira", "Linux"],
    },
  ],
  education: {
    degree: "Grado en Ingeniería Informática",
    institution: "Universitat Politècnica de València",
    period: "2019 – 2023",
  },
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Valenciano", level: "Nativo" },
    { name: "Inglés", level: "B2" },
  ],
  interests: "Usuario de Linux (distribuciones basadas en Debian) desde 2020.",
} as const;
