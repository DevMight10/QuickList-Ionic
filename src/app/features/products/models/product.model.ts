export type ProductCategory = 'all' | 'Electrónicos' | 'Calzado' | 'Ropa' | 'Hogar' | 'Deportes';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price?: number;
  imageUrl?: string;
  status?: 'Nuevo' | 'Editado' | 'Visto';
}
