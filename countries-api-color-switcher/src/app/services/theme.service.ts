import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Observable to check the state of the theme
  private isDarkModeSubject = new BehaviorSubject<boolean>(this.getInitialTheme());
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor() {}

  // Get initial theme based of localStorage
  private getInitialTheme(): boolean {
    return localStorage.getItem('theme') === 'dark';
  }

  toggleTheme(isDarkMode: boolean): void {
    this.isDarkModeSubject.next(isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }

  get currentTheme(): boolean {
    return this.isDarkModeSubject.value;
  }
}
