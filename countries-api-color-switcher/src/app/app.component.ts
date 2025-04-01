import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'countries-api-color-switcher';
 
  // Array to store countries infos
  countries: { 
    name: string; 
    flag: File; 
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
    /*
    const apiUrl = 'https://restcountries.com/v3.1/all?fields=name,flags,continents,region,population,borders,capital,languages,subregion,tld,currencies';
    this.http.get(apiUrl).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log('erro: ',error);
      }
    );*/
  }
}
