import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post(`${this.baseUrl}/auth/login`, body).pipe(
      tap((resp: any) => {
        if (resp.token) {
          localStorage.setItem('x-token', resp.token);
        }
      })
    );
  }

  logout() {
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );
    localStorage.removeItem('x-token');
    const options = { headers: headers };
    return this.http.post(`${this.baseUrl}/auth/logout`, null, options);
  }
}
