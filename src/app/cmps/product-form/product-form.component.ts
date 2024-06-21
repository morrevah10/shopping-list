import { Component } from '@angular/core';
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

  constructor(private productService: ProductService) { }

  addProduct(): void {
    const newProduct: Product = {
      id: Date.now(),
      name: this.productName,
      amount: this.productAmount,
      dateAdded: new Date()
    };

    this.productService.addProduct(newProduct);
    this.productName = '';
    this.productAmount = 0;
  }
}
