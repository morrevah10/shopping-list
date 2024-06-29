import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../modules/product.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  products: Product[] = [];
  isModalOpen: boolean = false;
  selectedProduct: Product | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products.map(product => ({ ...product, changed: false, hasImage: !!product.image }));
    });
  }

  onProductAdded(product: Product): void {
    this.products.push({ ...product, changed: false, hasImage: !!product.image });
  }

  removeProduct(id: number): void {
    this.productService.removeProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }

  toggleProductMarked(product: Product): void {
    this.productService.toggleMarked(product.id).subscribe(updatedProduct => {
      product.marked = updatedProduct.marked;
    }, error => {
      console.error('Error toggling product marked status:', error);
    });
  }

  onCommentChange(product: Product): void {
    product.changed = true;
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(product.id, { comments: product.comments }).subscribe(
      updatedProduct => {
        product.comments = updatedProduct.comments;
        product.changed = false;
      },
      error => {
        console.error('Error updating product comments:', error);
      }
    );
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any, product: Product): void {
    const file: File = event.target.files[0];
    if (file) {
      this.productService.uploadImage(product.id, file).subscribe(updatedProduct => {
        product.image = updatedProduct.image;
        product.hasImage = !!updatedProduct.image;
        console.log('Image uploaded:', updatedProduct);
      }, error => {
        console.error('Error uploading image:', error);
      });
    }
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }

  getImageUrl(productId: number | undefined): string {
    return productId ? `http://localhost:3000/products/${productId}/image` : '';
  }
}