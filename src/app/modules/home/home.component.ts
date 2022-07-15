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

    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    this.httpClient.get<string>(`${environment.codeSprintApiUrl}/test/auth`,
      { withCredentials: true, headers, responseType: 'text' as 'json' })
      .subscribe(
        (data) => {
          this.greeting = data
        },
        (error) => {
          console.error('error caught in component')

          this.httpClient.get<string>(`${environment.codeSprintApiUrl}/test`,
            { headers, responseType: 'text' as 'json' })
            .subscribe(data => this.greeting = data);

        });
  }
}