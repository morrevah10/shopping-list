import { Injectable } from '@angular/core';
import { Product } from '../modules/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  removeProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id);
  }
}
