import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../modules/product.model';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  products: Product[] = [];
  isModalOpen: boolean = false;
  selectedProduct: Product | null = null;
  loadingProductIds: Set<string> = new Set();

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

  removeProduct(id: string | undefined): void {
    console.log('Attempting to delete product:', id);
    if (id) {
      this.loadingProductIds.add(id);
      this.productService.removeProduct(id).subscribe(() => {
        this.products = this.products.filter(product => product._id !== id);
        console.log('Delete successful:', this.products);
        this.loadingProductIds.delete(id);
      }, error => {
        console.error('Error removing product:', error);
        this.loadingProductIds.delete(id);
      });
    }
  }



  toggleProductMarked(product: Product): void {
    if (product._id) {
      this.loadingProductIds.add(product._id);
      this.productService.toggleMarked(product._id).subscribe(updatedProduct => {
        product.marked = updatedProduct.marked;
        this.loadingProductIds.delete(product._id!);
      }, error => {
        console.error('Error toggling product marked status:', error);
        this.loadingProductIds.delete(product._id!);
      });
    }
  }

  onCommentChange(product: Product): void {
    product.changed = true;
  }

  updateProduct(product: Product): void {
    if (product._id) {
      this.loadingProductIds.add(product._id);
      this.productService.updateProduct(product._id, { comments: product.comments }).subscribe(
        updatedProduct => {
          const index = this.products.findIndex(p => p._id === product._id);
          if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct, changed: false };
          }
          this.loadingProductIds.delete(product._id!);
        },
        error => {
          console.error('Error updating product comments:', error);
          this.loadingProductIds.delete(product._id!);
        }
      );
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any, product: Product): void {
    const file: File = event.target.files[0];
    if (file && product._id) {
      this.loadingProductIds.add(product._id);
      this.productService.uploadImage(product._id, file).subscribe(
        updatedProduct => {
          const index = this.products.findIndex(p => p._id === product._id);
          if (index !== -1) {
            this.products[index] = { 
              ...this.products[index], 
              ...updatedProduct, 
              hasImage: true,
              imageUrl: `${updatedProduct.imageUrl}?t=${new Date().getTime()}`
            };
          }
          this.loadingProductIds.delete(product._id!);
        },
        error => {
          console.error('Error uploading image:', error);
          this.loadingProductIds.delete(product._id!);
        }
      );
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

  getImageUrl(productId: string | undefined): string {
    return this.productService.getImageUrl(productId);
  }
}