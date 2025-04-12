import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'countries-api-color-switcher';
  isDarkMode = false;
  showFilters = false;

  // Array to store countries infos
  countries: { 
    name: string; 
    flag: string; 
    population: number; 
    region: string; 
    capital: string;
    continents: string;
    borders: string[];
    languages: string[];
    subregion: string;
    tld: string;
    currencies: string[]
  }[] = []; 

  // Array to store filtered countries
  filteredCountries: { 
    name: string; 
    flag: string; 
    population: number; 
    region: string; 
    capital: string;
    continents: string;
    borders: string[];
    languages: string[];
    subregion: string;
    tld: string;
    currencies: string[]
  }[] = []; 

  regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  selectedRegion: string = '';
  searchTerm: string = '';

  constructor(private http: HttpClient, public themeService: ThemeService){}

  ngOnInit(): void {
    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
    
    const apiUrl = 'https://restcountries.com/v3.1/all?fields=name,flags,continents,region,population,borders,capital,languages,subregion,tld,currencies';
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        const newCountries = response.map((country: any) => ({
          name: country.name?.common || 'N/A',
          flag: country.flags?.png || country.flags.alt,
          population: country.population || 0,
          region: country.region || 'N/A',
          capital: country.capital?.[0] || 'N/A',
          continents: country.continents?.[0] || 'N/A',
          borders: country.borders || [],
          languages: country.languages ? Object.values(country.languages) : [],
          subregion: country.subregion || 'N/A',
          tld: country.tld?.[0] || 'N/A',
          currencies: country.currencies 
            ? Object.values(country.currencies).map((currency: any) => currency.name)
            : [],
        }));
        this.countries = [...newCountries];
        this.filteredCountries = [...this.countries];
      },
      (error) => {
        console.log('erro: ', error);
      }
    );
  }

  toggleTheme(): void {
    const isDark = !this.themeService.currentTheme;
    this.themeService.toggleTheme(isDark);
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  selectRegion(region: string) {
    this.selectedRegion = region;
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredCountries = this.countries.filter(country => {
      const matchesRegion = this.selectedRegion ? country.region.toLowerCase() === this.selectedRegion.toLowerCase() : true;
      return matchesRegion;
    });
    this.showFilters = !this.showFilters;
  }

  searchCountry(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredCountries = this.countries.filter(country => country.name.toLowerCase().includes(lowerCaseSearchTerm));
  }
}
