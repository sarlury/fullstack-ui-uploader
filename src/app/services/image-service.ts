import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Images, ImagesRes } from '../pages/utils/images';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  url = 'http://localhost:3000/image';

  private http = inject(HttpClient);

  uploadImages(file: File): Observable<ImagesRes> {
  const form = new FormData();
  form.append('file', file);

  return this.http.post<ImagesRes>(this.url, form);
}

  
}
