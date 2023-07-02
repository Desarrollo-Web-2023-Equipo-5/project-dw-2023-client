import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../interfaces/comment';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user';
import { Campaign } from '../interfaces/campaign.interface';
import { Request } from '../interfaces/request';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = environment.apiUrl || 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`).pipe(
      map((res: any) => {
        return res.user;
      })
    );
  }

  updateUser(id: string, user: any) {
    return this.http.put<any>(`${this.baseUrl}/users/${id}`, user);
  }

  getCurrentUserCampaigns(id: string): Observable<Campaign[]> {
    return this.http
      .get<Campaign[]>(`${this.baseUrl}/users/${id}/campaigns`)
      .pipe(
        map((res: any) => {
          return res.campaigns;
        })
      );
  }

  getLookingForGroupUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users?lfg=true`);
  }

  createComment(comment: Comment): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/comments`, comment).pipe(
      map((res: any) => {
        return res.id;
      })
    );
  }

  getComments(query: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/comments${query}`).pipe(
      map((res: any) => {
        return res.comments;
      })
    );
  }

  deleteComment(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/comments/${id}`);
  }

  updateComment(id: string, comment: any) {
    return this.http.put<any>(`${this.baseUrl}/comments/${id}`, comment);
  }

  createCampaign(campaign: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/campaigns`, campaign).pipe(
      map((res: any) => {
        return res.id;
      })
    );
  }

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<any>(`${this.baseUrl}/campaigns`).pipe(
      map((res: any) => {
        return res.campaigns;
      })
    );
  }

  getCampaign(id: string): Observable<Campaign> {
    return this.http.get<any>(`${this.baseUrl}/campaigns/${id}`).pipe(
      map((res: any) => {
        return res.campaign;
      })
    );
  }


  updateCampaign(id: string, campaign: any) {
    return this.http.put<any>(`${this.baseUrl}/campaigns/${id}`, campaign);
  }

  getCharactersheetByUserId(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${id}/characters`).pipe(
      map((res: any) => {
        return res.characters[0];
      })
    );
  }

  updateCharactersheet(id: string, character: any) {
    return this.http.put<any>(`${this.baseUrl}/characters/${id}`, character);
  }

  sendRequest(request: Request) {
    return this.http.post<any>(`${this.baseUrl}/requests`, request);
  }

  getRequests(id: string): Observable<Request[]> {
    return this.http
      .get<Request[]>(`${this.baseUrl}/requests/for-creator/${id}`)
      .pipe(
        map((res: any) => {
          return res.requests;
        })
      );
  }

  updateRequest(id: string, request: any) {
    return this.http.put<any>(`${this.baseUrl}/requests/${id}`, request);
  }

  getInvites(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/requests/for-user/${id}`).pipe(
      map((res: any) => {
        return res.requests;
      })
    );
  }
}
