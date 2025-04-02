import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { CommonModule } from '@angular/common';

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

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    
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
      },
      (error) => {
        console.log('erro: ', error);
      }
    );
  }
}
