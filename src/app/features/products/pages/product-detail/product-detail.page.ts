import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonButton, IonIcon, IonBadge, IonAlert } from '@ionic/angular/standalone';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductHeaderComponent } from '../../components/product-header/product-header.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonIcon, IonBadge, IonAlert, CommonModule,  ProductHeaderComponent]
})
export class ProductDetailPage implements OnInit {
  product: Product | undefined;
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

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProductById(productId).subscribe(product => {
          if (product) {
            this.product = product;
          } else {
            this.router.navigate(['/products']); // Si no se encuentra, volver a la lista
          }
        });
      }
    });
  }

  onEdit() {
    if (this.product) {
      this.router.navigate(['/product-form', this.product.id]);
    }
  }

  onDelete() {
    this.isAlertOpen = true;
  }

  async confirmDelete() {
    if (this.product) {
      await this.productService.deleteProduct(this.product.id);
      this.router.navigate(['/products']); // Volver a la lista después de eliminar
    }
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
