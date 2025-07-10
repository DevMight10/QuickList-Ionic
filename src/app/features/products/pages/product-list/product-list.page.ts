import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ProductService } from '../../services/product.service';
import { Product, ProductCategory } from '../../models/product.model';
import { Subscription, combineLatest, BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductHeaderComponent } from '../../components/product-header/product-header.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    IonGrid,
    IonRow,
    IonCol,
    ProductCardComponent,
    ProductHeaderComponent,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel
  ],
})
export class ProductListPage implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: ProductCategory[] = [];
  selectedCategory: ProductCategory | 'all' = 'all';
  private productsSubscription!: Subscription;
  private categoryFilterSubject = new BehaviorSubject<ProductCategory | 'all'>('all');

  constructor(private productService: ProductService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.categories = ['all', ...this.productService.getCategories()];

    this.productsSubscription = combineLatest([
      this.productService.getProducts(),
      this.categoryFilterSubject.asObservable().pipe(startWith('all'))
    ]).pipe(
      map(([products, selectedCategory]) => {
        if (selectedCategory === 'all') {
          return products;
        } else {
          return products.filter(p => p.category === selectedCategory);
        }
      })
    ).subscribe(filteredProducts => {
      this.products = filteredProducts;
    });
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.detail.value;
    this.categoryFilterSubject.next(this.selectedCategory);
  }

  handleView(productId: string) {
    this.router.navigate(['/product-detail', productId]);
  }

  handleEdit(productId: string) {
    this.router.navigate(['/product-form', productId]);
  }

  handleDelete(productId: string) {
    this.productService.deleteProduct(productId);
  }

  handleAdd() {
    this.router.navigate(['/product-form']);
  }

  handleLogout() {
    this.authService.logout();
  }
}
