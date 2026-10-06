import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
} from "@angular/core";

const INTERACTIVE =
  'a[href], button:not([disabled]), summary, select, label[for], [role="button"], [role="menuitem"], [role="tab"]';
const TEXT_FIELD =
  'input:not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';
const ACTIVE_CLASS = "custom-cursor";

// Dot that tracks the pointer plus a trailing ring that grows over interactive
// elements and pulses on click. Only for fine pointers without reduced motion.
@Component({
  selector: "app-cursor",
  standalone: true,
  template: `
    <div #ring class="cursor-ring"><div class="cursor-lens"></div></div>
    <div #dot class="cursor-dot"></div>
  `,
  host: { "aria-hidden": "true" },
})
export class CursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild("ring") ring?: ElementRef<HTMLElement>;
  @ViewChild("dot") dot?: ElementRef<HTMLElement>;
  private readonly zone = inject(NgZone);
  private frame = 0;
  private x = 0;
  private y = 0;
  private ringX = 0;
  private ringY = 0;
  private hoverTarget = 0;
  private hover = 0;
  private press = 0;
  private visible = false;
  private cleanup: Array<() => void> = [];

  ngAfterViewInit(): void {
    const ring = this.ring?.nativeElement;
    const dot = this.dot?.nativeElement;
    if (
      !ring ||
      !dot ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    document.documentElement.classList.add(ACTIVE_CLASS);
    this.zone.runOutsideAngular(() => {
      this.listen(window, "mousemove", (event: MouseEvent) => {
        this.x = event.clientX;
        this.y = event.clientY;
        if (!this.visible) {
          this.ringX = this.x;
          this.ringY = this.y;
          this.visible = true;
        }
        this.hoverTarget = this.hoverAmount(event.target);
      });
      this.listen(window, "mousedown", () => (this.press = 1));
      this.listen(window, "mouseup", () => (this.press *= 0.42));
      this.listen(window, "blur", () => (this.press = 0));
      this.listen(document.documentElement, "mouseleave", () => {
        this.visible = false;
        this.hoverTarget = 0;
      });
      this.frame = requestAnimationFrame(() => this.render(ring, dot));
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
    this.cleanup.forEach((remove) => remove());
    document.documentElement.classList.remove(ACTIVE_CLASS);
  }

  private render(ring: HTMLElement, dot: HTMLElement): void {
    this.ringX += (this.x - this.ringX) * 0.19;
    this.ringY += (this.y - this.ringY) * 0.19;
    this.hover += (this.hoverTarget - this.hover) * 0.15;
    this.press = this.press * 0.84 < 0.025 ? 0 : this.press * 0.84;

    const ringScale = 1 + this.hover * 0.88 - this.press * 0.18;
    const dotScale = 1 - this.hover * 0.45 + this.press * 0.6;
    ring.style.transform = `translate(${this.ringX}px, ${this.ringY}px) translate(-50%, -50%) scale(${ringScale})`;
    dot.style.transform = `translate(${this.x}px, ${this.y}px) translate(-50%, -50%) scale(${dotScale})`;
    ring.style.opacity = this.visible
      ? String(Math.min(0.5 + this.hover * 0.5, 1))
      : "0";
    dot.style.opacity = this.visible ? "1" : "0";
    ring.style.setProperty("--cursor-lens", String(this.hover * 0.9));
    ring.classList.toggle("active", this.hover > 0.55 || this.press > 0.12);

    this.frame = requestAnimationFrame(() => this.render(ring, dot));
  }

  private hoverAmount(target: EventTarget | null): number {
    if (!(target instanceof Element)) return 0;
    if (target.closest(TEXT_FIELD)) return 0.34;
    return target.closest(INTERACTIVE) ? 1 : 0;
  }

  private listen<K extends keyof WindowEventMap>(
    target: EventTarget,
    type: K,
    handler: (event: WindowEventMap[K]) => void,
  ): void {
    const listener = handler as EventListener;
    target.addEventListener(type, listener, { passive: true });
    this.cleanup.push(() => target.removeEventListener(type, listener));
  }
}
