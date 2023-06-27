import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  baseUrl: string = environment.apiUrl || 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  updateImage(
    file: File,
    collection: 'users' | 'campaigns',
    id: string
  ): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .put<{ img: string }>(
        `${this.baseUrl}/uploads/${collection}/${id}`,
        formData
      )
      .pipe(
        map(res => {
          return res.img;
        })
      );
  }
}
