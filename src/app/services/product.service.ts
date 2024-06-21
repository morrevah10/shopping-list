// // import { Injectable } from '@angular/core';
// // import { Product } from '../modules/product.model';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class ProductService {
// //   private products: Product[] = [];

// //   constructor() { }

// //   getProducts(): Product[] {
// //     return this.products;
// //   }

// //   addProduct(product: Product) {
// //     this.products.push(product);
// //   }

// //   removeProduct(id: number) {
// //     this.products = this.products.filter(product => product.id !== id);
// //   }
// // }


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Product } from '../modules/product.model';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   // private apiUrl = 'http://localhost:3000/products';
//   private apiUrl = 'https://shopinglist-backend.onrender.com/products';

//   constructor(private http: HttpClient) {}

//   getProducts(): Observable<Product[]> {
//     return this.http.get<Product[]>(this.apiUrl);
//   }

//   addProduct(product: Product): Observable<Product> {
//     return this.http.post<Product>(this.apiUrl, product);
//   }

//   removeProduct(id: number): Observable<{ success: boolean }> {
//     return this.http.delete<{ success: boolean }>(`${this.apiUrl}/${id}`);
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../modules/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://shopinglist-backend.onrender.com'; 

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  removeProduct(id: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/products/${id}`);
  }
}
