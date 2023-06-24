import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl: string = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) { }

  public getAllPosts(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/posts`);
  }

  public getPostsByParameter(category: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}?category=${category}`);
  }

  public getPostById(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/posts/${id}`);
  }

  public createPost(req: Request) {
    this.httpClient.post(`${this.apiUrl}/posts`, req);
  }

  public updatePost(req: Request) {
    this.httpClient.patch(`${this.apiUrl}/posts`, req);
  }

  public deletePost() {
    this.httpClient.delete(`${this.apiUrl}/posts`);
  }
}
