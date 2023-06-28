import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  public getAllUsers(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/users`);
  }

  public getUsersById(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/users/${id}`);
  }

  public createUser(req: Request) {
    this.httpClient.post(`${this.apiUrl}/users`, req);
  }

  public updateUser(req: Request) {
    this.httpClient.patch(`${this.apiUrl}/users`, req);
  }

  public deleteUser() {
    this.httpClient.delete(`${this.apiUrl}/users`);
  }
}
