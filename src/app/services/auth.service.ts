import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.apiUrl || 'http://localhost:3000/api';

  private _activeUser!: User;

  get activeUser() {
    return { ...this._activeUser };
  }

  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string) {
    const body = { username, email, password };
    return this.http.post<any>(`${this.baseUrl}/users`, body);
  }

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post<any>(`${this.baseUrl}/auth/login`, body).pipe(
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
    return this.http.post<any>(`${this.baseUrl}/auth/logout`, null, options);
  }

  validateToken() {
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );
    const options = { headers: headers };
    return this.http
      .post<any>(`${this.baseUrl}/auth/renew`, null, options)
      .pipe(
        map(resp => {
          if (resp.ok) {
            this._activeUser = resp.user;
            localStorage.setItem('x-token', resp.token);
            return true;
          }
          return false;
        }),
        catchError(err => of(false))
      );
  }
}
