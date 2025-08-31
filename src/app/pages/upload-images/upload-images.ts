import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-images',
  imports: [CommonModule, NgIf],
  templateUrl: './upload-images.html',
  styleUrl: './upload-images.scss'
})
export class UploadImages {

  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  dragging = signal(false);
  progress = signal(0);
  state = signal<'idle'|'uploading'|'done'|'error'>('idle');
  fileName = '';
  errorMsg = '';
  private abort?: AbortController;

  // drag&drop handlers
  onDragOver(e: DragEvent) { e.preventDefault(); this.dragging.set(true); }
  onDragLeave(e: DragEvent) { e.preventDefault(); this.dragging.set(false); }
  onDrop(e: DragEvent) {
    e.preventDefault();
    this.dragging.set(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) this.upload(file);
  }

  onFilePicked(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) this.upload(file);
  }

  upload(file: File) {
    this.errorMsg = '';
    if (!/^image\//.test(file.type)) {
      this.errorMsg = 'Only image files are allowed.';
      return;
    }

    const form = new FormData();
    form.append('file', file);
    this.fileName = file.name;
    this.progress.set(0);
    this.state.set('uploading');

    // support cancel
    this.abort = new AbortController();

    // this.http.post('http://localhost:3000/image', form, {
    //   observe: 'events',
    //   reportProgress: true,
    //   signal: this.abort.signal
    // }).subscribe({
    //   next: (ev) => {
    //     if (ev.type === HttpEventType.UploadProgress && ev.total) {
    //       const pct = Math.round((ev.loaded / ev.total) * 100);
    //       this.progress.set(pct);
    //     } else if (ev.type === HttpEventType.Response) {
    //       this.progress.set(100);
    //       this.state.set('done');
    //     }
    //   },
    //   error: (err) => {
    //     if (err.name === 'AbortError') return; // cancelled
    //     this.errorMsg = err?.error?.error || err.message || 'Upload failed';
    //     this.state.set('error');
    //   }
    // });
  }

  cancel() {
    this.abort?.abort();
    this.state.set('idle');
    this.progress.set(0);
    this.fileName = '';
  }
  reset() {
    this.state.set('idle');
    this.progress.set(0);
    this.errorMsg = '';
    this.fileName = '';
    this.fileInput?.nativeElement?.value && (this.fileInput.nativeElement.value = '');
  }

}
