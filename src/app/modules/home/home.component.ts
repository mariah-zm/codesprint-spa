import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  greeting = "";

  constructor(private httpClient: HttpClient) {
    // To get rid of facebook's callback characters appended to url
    if (window.location.hash && window.location.hash == '#_=_') {
      window.location.hash = '';
    }
  }
}