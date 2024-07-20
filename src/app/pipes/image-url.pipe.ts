import { Pipe, PipeTransform } from '@angular/core';
import { ProductService } from '../../app/services/product.service';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {
  constructor(private productService: ProductService) {}

  transform(productId: string | undefined): string {
    return this.productService.getImageUrl(productId);
  }
}