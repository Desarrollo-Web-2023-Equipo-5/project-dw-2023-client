import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = environment.apiUrl || 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUserById(id: string) {
    return this.http.get<any>(`${this.baseUrl}/users/${id}`);
  }

  createComment(comment: Comment) {
    return this.http.post<any>(`${this.baseUrl}/comments`, comment);
  }

  getComments(query: string) {
    return this.http.get<any>(`${this.baseUrl}/comments${query}`);
  }

  deleteComment(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/comments/${id}`);
  }

  createCampaign(campaign: any) {
    return this.http.post<any>(`${this.baseUrl}/campaigns`, campaign);
  }
}
