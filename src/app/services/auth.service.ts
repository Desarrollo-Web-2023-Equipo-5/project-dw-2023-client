import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.apiUrl || 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string) {
    const body = { username, email, password };
    return this.http.post(`${this.baseUrl}/users`, body);
  }

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
