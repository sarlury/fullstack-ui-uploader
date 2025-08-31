import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Images, ImagesRes } from '../pages/utils/images';
import { Path } from '../pages/utils/Path';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private http = inject(HttpClient);

  uploadImages(file: File): Observable<ImagesRes> {
  const form = new FormData();
  form.append('file', file);

  return this.http.post<ImagesRes>(Path.UPLOAD_IMAGE, form);
}

  
}
