import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { IonCard, IonItem, IonThumbnail, IonLabel, IonBadge, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline, createOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [IonCard, IonItem, IonThumbnail, IonLabel, IonBadge, IonButton, IonIcon, CommonModule]
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() view = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  constructor() {
    addIcons({ eyeOutline, createOutline, trashOutline });
  }

  onView() {
    this.view.emit(this.product.id);
  }

  onEdit() {
    this.edit.emit(this.product.id);
  }

  onDelete() {
    this.delete.emit(this.product.id);
  }
}
