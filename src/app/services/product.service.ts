import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../modules/product.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = this.getApiUrl();
  }

  private getApiUrl(): string {
    const host = window.location.host;
    if (host.includes('localhost')) {
      console.log('Environment: Development');
      return 'http://localhost:3000/products';
    } else {
      console.log('Environment: Production');
      return 'https://shopinglist-backend.onrender.com/products';
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} ${error.statusText}\nMessage: ${error.message}`;
      if (error.error) {
        errorMessage += `\nServer response: ${JSON.stringify(error.error)}`;
      }
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getProducts(): Observable<Product[]> {
    console.log('Fetching products...');
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  addProduct(product: Omit<Product, '_id'>): Observable<Product> {
    console.log('Adding product:', product);
    return this.http.post<Product>(this.apiUrl, product).pipe(
      catchError(this.handleError)
    );
  }

  removeProduct(id: string): Observable<{ success: boolean }> {
    console.log('Removing product with id:', id);
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(id: string, updateData: Partial<Product>): Observable<Product> {
    console.log('Updating product with id:', id, 'with data:', updateData);
    return this.http.put<Product>(`${this.apiUrl}/${id}`, updateData).pipe(
      catchError(this.handleError)
    );
  }

  toggleMarked(id: string): Observable<Product> {
    console.log('Toggling marked status for product with id:', id);
    return this.http.put<Product>(`${this.apiUrl}/${id}/toggle-marked`, {}).pipe(
      catchError(this.handleError)
    );
  }

  uploadImage(id: string, file: File): Observable<Product> {
    console.log('Uploading image for product with id:', id);
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post<Product>(`${this.apiUrl}/${id}/upload-image`, formData).pipe(
      catchError(this.handleError)
    );
  }

  getImageUrl(productId: string | undefined): string {
    if (!productId) return '';
    const host = window.location.host;
    const baseUrl = host.includes('localhost') ? 'http://localhost:3000' : 'https://shopinglist-backend.onrender.com';
    return `${baseUrl}/products/${productId}/image?t=${new Date().getTime()}`;
  }
}