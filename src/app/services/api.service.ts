import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = environment.apiUrl || 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUserById(id: string) {
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );
    const options = { headers: headers };
    return this.http.get<any>(`${this.baseUrl}/users/${id}`, options);
  }
}
