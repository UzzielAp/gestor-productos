import { Component } from '@angular/core';
import { Product } from './models/product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  standalone: false,

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestor-productos';

  editingProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  onSave(product: Product) {
    if (this.editingProduct) {
      this.productService.updateProduct(product).subscribe({
        next: () => {
          console.log('Producto actualizado');
          this.editingProduct = null;
        },
        error: (err) => {
          console.error('Error al actualizar producto:', err);
        }
      });
    } else {
      this.productService.addProduct(product).subscribe({
        next: () => {
          console.log('Producto agregado');
          this.editingProduct = null;
        },
        error: (err) => {
          console.error('Error al agregar producto:', err);
        }
      });
    }
  }

  onCancel() {
    this.editingProduct = null;
  }
}
