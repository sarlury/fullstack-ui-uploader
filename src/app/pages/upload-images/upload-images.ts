import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { ImageService } from '../../services/image-service';

@Component({
  selector: 'app-upload-images',
  imports: [CommonModule, NgIf],
  templateUrl: './upload-images.html',
  styleUrl: './upload-images.scss'
})
export class UploadImages {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;
  private imageService = inject(ImageService);
  dragging = signal(false);
  progress = signal(0);
  state = signal<'idle'|'uploading'|'done'|'error'>('idle');
  fileName = '';
  errorMsg = '';
  private abort?: AbortController;

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

    this.abort = new AbortController();

    this.imageService.uploadImages(file).subscribe({
      next: (res) => {
        console.log('res', res)
      },
      error: (err) => {
        console.log('err', err)
      }
    })
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
