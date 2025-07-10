import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, saveOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonIcon, CommonModule]
})
export class ProductHeaderComponent {
  @Input() title: string = '';
  @Input() showBackButton: boolean = false;
  @Input() backButtonHref: string = '/products';
  @Input() showAddButton: boolean = false;
  @Input() showEditButton: boolean = false;
  @Input() showSaveButton: boolean = false;
  @Input() showLogoutButton: boolean = false;

  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  constructor() {
    addIcons({ addOutline, createOutline, saveOutline, logOutOutline });
  }

  onAdd() {
    this.add.emit();
  }

  onEdit() {
    this.edit.emit();
  }

  onSave() {
    this.save.emit();
  }

  onLogout() {
    this.logout.emit();
  }
}
