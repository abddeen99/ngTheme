import {Inject, Injectable, InjectionToken, Renderer2, RendererFactory2} from "@angular/core";
import {BehaviorSubject} from "rxjs";

export const LOAD_THEME_TOKEN = new InjectionToken<() => void>('LOAD_THEME_TOKEN');
export const SAVE_THEME_TOKEN = new InjectionToken<(enabled: boolean) => void>('SAVE_THEME_TOKEN');

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private darkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly attributeName: string = 'data-bs-theme';

  constructor(@Inject(LOAD_THEME_TOKEN) public loadTheme: () => void,
              @Inject(SAVE_THEME_TOKEN) public saveTheme: (enabled: boolean) => void,
              private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);

    this.observeThemeChanges();

    loadTheme();
  }

  private observeThemeChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === this.attributeName) {
          const themeValue = this.getThemeValue();

          this.darkModeSubject.next(themeValue === 'dark');

          this.saveTheme(themeValue === 'dark');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
  }

  private getThemeValue(): string {
    return document.documentElement.getAttribute('data-bs-theme') || '';
  }

  private setTheme(theme: string) {
    this.renderer.setAttribute(document.documentElement, 'data-bs-theme', theme);
  }

  public darkMode(): BehaviorSubject<boolean> {
    const themeValue = this.getThemeValue();

    this.darkModeSubject.next(themeValue === 'dark');

    return this.darkModeSubject;
  }

  public toggle() {
    const currentTheme = this.getThemeValue();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    this.setTheme(newTheme);
  }

  public enable() {
    this.setTheme('dark');
  }

  public disable() {
    this.setTheme('light');
  }
}
