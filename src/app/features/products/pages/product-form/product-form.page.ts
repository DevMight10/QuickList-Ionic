import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonList, IonItem, IonInput, IonTextarea, IonSelect, IonSelectOption, IonToast, IonButton, IonAlert } from '@ionic/angular/standalone';
import { ProductService } from '../../services/product.service';
import { Product, ProductCategory } from '../../models/product.model';
import { ProductHeaderComponent } from '../../components/product-header/product-header.component';
import { ProductImageUploadComponent } from '../../components/product-image-upload/product-image-upload.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
  standalone: true,
  imports: [IonContent, IonList, IonItem, IonInput, IonTextarea, IonSelect, IonSelectOption, IonToast, IonButton, CommonModule, ProductHeaderComponent, ProductImageUploadComponent, FormsModule]
})
export class ProductFormPage implements OnInit {
  product: Product = {
    id: '',
    name: '',
    description: '',
    category: 'Electrónicos', // Default category
    price: undefined,
    imageUrl: '',
  };
  isEditMode = false;
  categories: ProductCategory[] = [];
  isToastOpen = false;
  toastMessage = '';
  isAlertOpen = false;
  alertButtons = [
    { text: 'Cancelar', role: 'cancel' },
    { text: 'Eliminar', role: 'confirm', handler: () => this.confirmDelete() }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  async ngOnInit() {
    this.categories = this.productService.getCategories();

    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.isEditMode = true;
        this.productService.getProductById(productId).subscribe(product => {
          if (product) {
            this.product = { ...product }; // Clonar para evitar mutación directa
          } else {
            this.router.navigate(['/products']); // Si no se encuentra, volver a la lista
          }
        });
      }
    });
  }

  onImageSelected(imageUrl: string) {
    this.product.imageUrl = imageUrl;
  }

  async onSave() {
    if (!this.product.name || !this.product.description || !this.product.category) {
      this.toastMessage = 'Por favor, completa todos los campos obligatorios.';
      this.isToastOpen = true;
      return;
    }

    if (this.isEditMode) {
      await this.productService.updateProduct(this.product);
      this.toastMessage = 'Producto actualizado exitosamente.';
    } else {
      await this.productService.addProduct(this.product);
      this.toastMessage = 'Producto creado exitosamente.';
    }
    this.isToastOpen = true;
    this.router.navigate(['/products']);
  }

  onDelete() {
    this.isAlertOpen = true;
  }

  async confirmDelete() {
    if (this.product.id) {
      await this.productService.deleteProduct(this.product.id);
      this.toastMessage = 'Producto eliminado exitosamente.';
      this.isToastOpen = true;
      this.router.navigate(['/products']);
    }
  }

  setToastOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  setAlertOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}