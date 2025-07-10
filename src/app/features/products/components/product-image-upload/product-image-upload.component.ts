import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonIcon, IonActionSheet, IonToast } from '@ionic/angular/standalone';

@Component({
  selector: 'app-product-image-upload',
  templateUrl: './product-image-upload.component.html',
  styleUrls: ['./product-image-upload.component.scss'],
  standalone: true,
  imports: [IonIcon, IonActionSheet, IonToast, CommonModule]
})
export class ProductImageUploadComponent {
  @Input() imageUrl: string | undefined;
  @Output() imageSelected = new EventEmitter<string>();

  isActionSheetOpen = false;
  isToastOpen = false;
  toastMessage = '';

  actionSheetButtons = [
    { text: 'Seleccionar de Galería', handler: () => this.pickFromGallery() },
    { text: 'Cancelar', role: 'cancel' },
  ];

  constructor() { }

  selectImage() {
    this.isActionSheetOpen = true;
  }

  async pickFromGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });
      if (image.dataUrl) {
        this.imageSelected.emit(image.dataUrl);
      }
    } catch (error) {
      console.error('Error al seleccionar de galería:', error);
      this.toastMessage = `Error al seleccionar imagen: ${error instanceof Error ? error.message : String(error)}`;
      this.isToastOpen = true;
    }
  }

  setActionSheetOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }

  setToastOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
