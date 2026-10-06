import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { CursorComponent } from "./cursor.component";
import { portfolio } from "./portfolio.data";

type Theme = "dark" | "light";
type TerminalLine = { kind: "input" | "output"; text: string };

const REVEAL_SELECTOR = [
  ".hero-copy > *",
  ".hero-photo",
  ".hero-highlights",
  ".content-section > .section-kicker",
  ".content-section > h2",
  ".content-section > p",
  ".focus-card",
  ".timeline-item",
  ".experience-card",
  ".work-card",
  ".skill-group",
  ".education-card",
  ".contact-grid > div",
  ".contact-links",
].join(", ");

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CursorComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild("editor") editor?: ElementRef<HTMLElement>;
  readonly data = portfolio;
  readonly icons = "assets/icons/";
  activeSection = "home";
  theme: Theme = "dark";
  menu: string | null = null;
  zen = false;
  sidebarOpen = true;
  terminalOpen = false;
  assistantOpen = false;
  outlineOpen = false;
  timelineOpen = false;
  booting = false;
  command = "";
  assistantQuestion = "";
  assistantAnswer =
    "Hola. Puedo ayudarte a encontrar información sobre mi experiencia, tecnologías, proyectos o contacto.";
  terminalHistory: TerminalLine[] = [
    {
      kind: "output",
      text: "Rafael Portfolio Terminal — escribe help para ver comandos.",
    },
  ];
  private bootTimer?: ReturnType<typeof setTimeout>;
  private revealObserver?: IntersectionObserver;

  constructor() {
    if (typeof window !== "undefined") {
      this.theme =
        localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark";
      document.documentElement.dataset["theme"] = this.theme;
      this.booting =
        !sessionStorage.getItem("portfolio-booted") &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (this.booting) {
        this.bootTimer = setTimeout(() => {
          this.booting = false;
          sessionStorage.setItem("portfolio-booted", "1");
          this.scrollToHash();
        }, 1300);
      }
    }
  }

  ngAfterViewInit(): void {
    this.setupReveal();
    setTimeout(() => this.scrollToHash(), this.booting ? 1400 : 0);
  }

  ngOnDestroy(): void {
    if (this.bootTimer) clearTimeout(this.bootTimer);
    this.revealObserver?.disconnect();
  }

  // Hides editor blocks and fades them in as they scroll into view; siblings stagger.
  private setupReveal(): void {
    const editor = this.editor?.nativeElement;
    if (!editor || this.reducedMotion() || !("IntersectionObserver" in window))
      return;
    const targets = Array.from(
      editor.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );
    for (const element of targets) {
      const siblings = Array.from(element.parentElement?.children ?? []).filter(
        (sibling) => sibling.matches(REVEAL_SELECTOR),
      );
      const index = Math.min(Math.max(siblings.indexOf(element), 0), 6);
      element.style.setProperty("--reveal-index", String(index));
      element.classList.add("reveal");
    }
    this.revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          this.revealObserver?.unobserve(element);
          element.classList.add("revealed");
          // Drop the reveal styles afterwards so hover transitions get no delay.
          const finish = (event: TransitionEvent) => {
            if (event.target !== element || event.propertyName !== "translate")
              return;
            element.removeEventListener("transitionend", finish);
            element.classList.remove("reveal", "revealed");
            element.style.removeProperty("--reveal-index");
          };
          element.addEventListener("transitionend", finish);
        }
      },
      { root: editor, rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    setTimeout(
      () => targets.forEach((element) => this.revealObserver?.observe(element)),
      this.booting ? 1300 : 0,
    );
  }

  @HostListener("window:hashchange") onHashChange(): void {
    this.scrollToHash();
  }
  @HostListener("document:keydown.escape") onEscape(): void {
    this.menu = null;
    this.assistantOpen = false;
    this.zen = false;
  }

  @HostListener("document:keydown", ["$event"]) onShortcut(
    event: KeyboardEvent,
  ): void {
    if (
      (event.metaKey || event.ctrlKey) &&
      (event.code === "Backquote" || event.key.toLowerCase() === "j")
    ) {
      event.preventDefault();
      this.terminalOpen = !this.terminalOpen;
    }
  }

  icon(name: string): string {
    return `${this.icons}${name}.svg`;
  }
  currentFile(): string {
    return (
      this.data.sections.find((s) => s.id === this.activeSection)?.file ??
      "home.ts"
    );
  }

  navigate(id: string): void {
    this.activeSection = id;
    this.menu = null;
    history.replaceState(null, "", `#${id}`);
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: this.reducedMotion() ? "instant" : "smooth",
        block: "start",
      });
  }

  private scrollToHash(): void {
    const id = location.hash.replace("#", "") || "home";
    if (this.data.sections.some((s) => s.id === id)) {
      this.activeSection = id;
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }

  onEditorScroll(): void {
    const editor = this.editor?.nativeElement;
    if (!editor) return;
    const top = editor.getBoundingClientRect().top + 130;
    for (const section of this.data.sections) {
      const element = document.getElementById(section.id);
      if (element && element.getBoundingClientRect().top <= top)
        this.activeSection = section.id;
    }
  }

  toggleMenu(name: string): void {
    this.menu = this.menu === name ? null : name;
  }
  setTheme(theme: Theme): void {
    this.theme = theme;
    document.documentElement.dataset["theme"] = theme;
    localStorage.setItem("portfolio-theme", theme);
    this.menu = null;
  }
  toggleZen(): void {
    this.zen = !this.zen;
    this.menu = null;
  }
  reducedMotion(): boolean {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  menuAction(action: string): void {
    this.menu = null;
    if (action === "terminal") this.terminalOpen = !this.terminalOpen;
    else if (action === "sidebar") this.sidebarOpen = !this.sidebarOpen;
    else if (action === "zen") this.toggleZen();
    else if (action === "assistant") this.assistantOpen = !this.assistantOpen;
    else if (action === "email")
      window.location.href = `mailto:${this.data.email}`;
    else if (action === "theme")
      this.setTheme(this.theme === "dark" ? "light" : "dark");
    else this.navigate(action);
  }

  runCommand(): void {
    const input = this.command.trim();
    if (!input) return;
    this.terminalHistory.push({
      kind: "input",
      text: `rafael@portfolio:~$ ${input}`,
    });
    const command = input.toLowerCase();
    if (command === "clear") this.terminalHistory = [];
    else if (command === "help")
      this.terminalHistory.push({
        kind: "output",
        text: "Comandos: help, about, skills, work, career, contact, clear",
      });
    else if (command === "about") {
      this.terminalHistory.push({ kind: "output", text: this.data.summary });
      this.navigate("home");
    } else if (["skills", "work", "career", "contact"].includes(command)) {
      this.navigate(command === "work" ? "my-work" : command);
      this.terminalHistory.push({
        kind: "output",
        text: `Abriendo ${command}…`,
      });
    } else
      this.terminalHistory.push({
        kind: "output",
        text: `Comando no reconocido: ${input}. Escribe help.`,
      });
    this.command = "";
  }

  askAssistant(question?: string): void {
    const q = (question ?? this.assistantQuestion).trim();
    if (!q) return;
    this.assistantQuestion = q;
    const lower = q.toLocaleLowerCase("es");
    if (/contact|correo|email|teléfono|telefono|hablar/.test(lower))
      this.assistantAnswer = `Puedes escribir a ${this.data.email}, llamar al ${this.data.phone} o usar LinkedIn. Abre contact.css para ver todos los enlaces.`;
    else if (/proyecto|work|npm|vep|leetcode/.test(lower))
      this.assistantAnswer =
        "Mis proyectos personales son Vep Inmobiliaria (Astro + FastAPI), ts-useful-types (librería npm) y LeetCode Problems (Python y Java). Encontrarás enlaces en work.ts.";
    else if (/angular|tecnolog|stack|skill|playwright|ia/.test(lower))
      this.assistantAnswer =
        "Trabajo principalmente con Angular, TypeScript, RxJS y signals. Para calidad y automatización utilizo Playwright, Stagehand, agentes LLM y GitHub Actions.";
    else if (/experiencia|trabajo|empresa|career/.test(lower))
      this.assistantAnswer =
        "Trabajo en Imperia SCM desde abril de 2024. Antes fui Fullstack Developer en VickyFoods y Backend Developer en Odec Centro de Cálculo.";
    else
      this.assistantAnswer =
        "Este asistente responde con la información de este portfolio. Puedes preguntarme por experiencia, tecnologías, proyectos o contacto.";
  }
}
