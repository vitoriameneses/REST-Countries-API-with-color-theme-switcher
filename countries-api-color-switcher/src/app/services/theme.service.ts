import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const initialTheme = this.getInitialTheme();
    this.isDarkModeSubject.next(initialTheme);
    this.applyTheme(initialTheme);
  }

  private getInitialTheme(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('theme') === 'dark';
    }
    return false; // padrão caso esteja no SSR ou Vite
  }

  toggleTheme(isDarkMode: boolean): void {
    this.isDarkModeSubject.next(isDarkMode);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
    this.applyTheme(isDarkMode);
  }

  private applyTheme(isDarkMode: boolean): void {
    const classList = this.document.documentElement.classList;
    classList.remove('dark-theme', 'light-theme');
    classList.add(isDarkMode ? 'dark-theme' : 'light-theme');
  }

  get currentTheme(): boolean {
    return this.isDarkModeSubject.value;
  }
}
