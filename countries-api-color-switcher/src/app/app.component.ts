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

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    const apiUrl = 'https://restcountries.com/v3.1/all?fields=name,flags';
    this.http.get(apiUrl).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log('erro: ',error);
      }
    );
  }
}
