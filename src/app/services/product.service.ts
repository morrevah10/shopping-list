import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../modules/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    console.log('Fetching products...');
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product): Observable<Product> {
    console.log('Adding product:', product);
    return this.http.post<Product>(this.apiUrl, product);
  }

  removeProduct(id: number): Observable<{ success: boolean }> {
    console.log('Removing product with id:', id);
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, updateData: Partial<Product>): Observable<Product> {
    console.log('Updating product with id:', id, 'with data:', updateData);
    return this.http.put<Product>(`${this.apiUrl}/${id}`, updateData);
  }

  toggleMarked(id: number): Observable<Product> {
    console.log('Toggling marked status for product with id:', id);
    return this.http.put<Product>(`${this.apiUrl}/${id}/toggle-marked`, {});
  }

  uploadImage(id: number, file: File): Observable<Product> {
    console.log('Uploading image for product with id:', id);
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post<Product>(`${this.apiUrl}/${id}/upload-image`, formData);
  }
}
