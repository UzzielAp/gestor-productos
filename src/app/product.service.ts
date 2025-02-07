import { Injectable } from '@angular/core';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];

  constructor() {
    this.loadProducts(); 
  }

  private loadProducts() {
    const storedProducts = localStorage.getItem('products');
    this.products = storedProducts ? JSON.parse(storedProducts) : [];
  }

  private saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  getProducts() {
    return this.products;
  }

  addProduct(product: Product) {
    product.id = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1; 
    this.products.push(product);
    this.saveProducts();
  }

  getProductById(id: number) {
    return this.products.find(p => p.id === id);
  }

  updateProduct(updateProduct: Product) {
    const index = this.products.findIndex(p => p.id === updateProduct.id);
    if (index !== -1) {
      this.products[index] = updateProduct;
      this.saveProducts(); 
    }
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    this.saveProducts(); 
  }
}

