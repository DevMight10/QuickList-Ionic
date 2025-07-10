import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Product, ProductCategory } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const PRODUCT_CATEGORIES: ProductCategory[] = ['Electrónicos', 'Calzado', 'Ropa', 'Hogar', 'Deportes'];

const BASE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Smartphone Apple con chip A17 Pro',
    category: 'Electrónicos',
    price: 999,
    imageUrl: '/assets/icon/logo-quicklist.png',
    status: 'Nuevo',
  },
  {
    id: '2',
    name: 'Nike Air Max',
    description: 'Zapatillas deportivas cómodas',
    category: 'Calzado',
    price: 120,
    imageUrl: '/assets/icon/logo-quicklist.png',
    status: 'Editado',
  },
  {
    id: '3',
    name: 'MacBook Pro',
    description: 'Laptop profesional para desarrollo',
    category: 'Electrónicos',
    price: 1800,
    imageUrl: '/assets/icon/logo-quicklist.png',
    status: 'Visto',
  },
  
];

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _storage: Storage | null = null;
  private _products = new BehaviorSubject<Product[]>([]);
  readonly products$: Observable<Product[]> = this._products.asObservable();
  private readonly PRODUCTS_KEY = 'my_products';

  constructor(private storage: Storage) {
    // this.init(); // Se llamará manualmente desde AppComponent
  }

  async init() {
    if (this._storage) { // Evitar reinicialización
      return;
    }
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadProducts();
  }

  private async loadProducts() {
    const storedProducts: Product[] = (await this._storage?.get(this.PRODUCTS_KEY)) || [];

    // Combinar productos base con productos guardados
    // Asegurarse de que los productos base estén presentes y no duplicados
    const combinedProducts = [...BASE_PRODUCTS];
    storedProducts.forEach(storedProduct => {
      if (!combinedProducts.some(baseProduct => baseProduct.id === storedProduct.id)) {
        combinedProducts.push(storedProduct);
      }
    });

    this._products.next(combinedProducts);
    await this.saveProducts(combinedProducts);
  }

  private async saveProducts(productsToSave: Product[]) {
    await this._storage?.set(this.PRODUCTS_KEY, productsToSave);
  }

  // Métodos CRUD

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductsByCategory(category: ProductCategory): Observable<Product[]> {
    return this.products$.pipe(
      map(products => products.filter(p => p.category === category))
    );
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.products$.pipe(
      map(products => products.find(p => p.id === id))
    );
  }

  async addProduct(product: Product): Promise<void> {
    const currentProducts = this._products.getValue();
    product.id = Date.now().toString(); // Generar un ID simple basado en el timestamp
    const updatedProducts = [...currentProducts, product];
    this._products.next(updatedProducts);
    await this.saveProducts(updatedProducts);
  }

  async updateProduct(product: Product): Promise<void> {
    const currentProducts = this._products.getValue();
    const index = currentProducts.findIndex(p => p.id === product.id);
    if (index > -1) {
      const updatedProducts = [...currentProducts];
      updatedProducts[index] = product;
      this._products.next(updatedProducts);
      await this.saveProducts(updatedProducts);
    }
  }

  async deleteProduct(id: string): Promise<void> {
    const currentProducts = this._products.getValue();
    const updatedProducts = currentProducts.filter(p => p.id !== id);
    this._products.next(updatedProducts);
    await this.saveProducts(updatedProducts);
  }

  // Método para obtener categorías (fijas por ahora)
  getCategories(): ProductCategory[] {
    return PRODUCT_CATEGORIES;
  }
}
