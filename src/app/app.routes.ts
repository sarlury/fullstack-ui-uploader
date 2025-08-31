import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  {
    path: 'upload',
    loadComponent: () =>
      import('./pages/upload-images/upload-images').then(m => m.UploadImages)
  },
  {
    path: 'show-images',
    loadComponent: () =>
      import('./pages/show-images/show-images').then(m => m.ShowImages)
  }
];
