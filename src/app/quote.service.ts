import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable()
export class QuoteService {
  constructor(private http: Http, private authService: AuthService) {

  }

  addQuote(content: string) {
    const token = this.authService.getToken();
    const body = JSON.stringify({content: content});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost/laravel_angular_academind/public/api/quote?token=' + token, body, {headers: headers})
  }

  getQuotes(): Observable<any> {
    const token = this.authService.getToken();
    return this.http.get( 'http://localhost/laravel_angular_academind/public/api/quotes?token=' + token)
      .map(
        (response: Response) => {
          return response.json().quotes;
        }
      );
  }

  updateQuote(id: number, newContent: string) {
    const token = this.authService.getToken();
    const body = JSON.stringify({content: newContent});
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('http://localhost/laravel_angular_academind/public/api/quote/' + id + '?token=' + token, body, {headers: headers})
      .map(
        (response: Response) => response.json()
      );
  }

  deleteQuote(id: number) {
    const token = this.authService.getToken();
    return this.http.delete('http://localhost/laravel_angular_academind/public/api/quote/' + id + '?token=' + token);
  }
}