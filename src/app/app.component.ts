import { Component } from '@angular/core';
import { Product } from './models/product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestor-productos';

  editingProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  onSave(product: Product) {
    if (this.editingProduct) {
      this.productService.updateProduct(product);
    } else {
      this.productService.addProduct(product);
    }
    this.editingProduct = null;
  }

  onCancel() {
    this.editingProduct = null;
  }
}
