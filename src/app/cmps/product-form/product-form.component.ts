import { Component, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../modules/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  productName: string = '';
  productAmount: number = 0;
  productComments: string = '';
  productCategory: string = '';  
  categories: string[] = ['יבשים', 'ניקיון', 'ירקות', 'פירות','חלבי','כללי','בשרי','טבעוני','גאנק','שתייה']; 

  @Output() productAdded = new EventEmitter<Product>();

  constructor(private productService: ProductService) { }

  addProduct(): void {
    const newProduct: Product = {
      id: Date.now(),
      name: this.productName,
      amount: this.productAmount,
      dateAdded: new Date(),
      comments: this.productComments,
      category: this.productCategory,  
      marked: false
    };

    this.productService.addProduct(newProduct).subscribe((product) => {
      this.productAdded.emit(product);
      this.productName = '';
      this.productAmount = 0;
      this.productComments = '';
      this.productCategory = '';
    }, error => {
      console.error('Error adding product:', error);
    });
  }
}
