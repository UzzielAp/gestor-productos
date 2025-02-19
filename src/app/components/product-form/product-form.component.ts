import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: false,

  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnChanges {
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Product>();
  @Input() editingProduct: Product | null = null;

  get name() {
    return this.productForm.get('name') as FormControl;
  }

  get price() {
    return this.productForm.get('price') as FormControl;
  }

  get descripcion() {
    return this.productForm.get('descripcion') as FormControl;
  }

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      descripcion: ['', Validators.required]
    });

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe(product => {
        this.editingProduct = product !== undefined ? product : null;
        if (this.editingProduct) {
          this.productForm.setValue(this.editingProduct);
        }
      });
    }
  }

  ngOnChanges() {
    if (this.editingProduct) {
      this.productForm.setValue(this.editingProduct);
    }
  }

  submit() {
    if (this.productForm.valid) {
      if (this.editingProduct) {
        this.productService.updateProduct(this.productForm.value).subscribe({
          next: () => {
            console.log('Producto actualizado');
            this.save.emit(this.productForm.value);
            this.router.navigate(['/products']);
          },
          error: (err) => {
            console.error('Error al actualizar producto:', err);
          }
        });
      } else {
        this.productService.addProduct(this.productForm.value).subscribe({
          next: () => {
            console.log('Producto agregado');
            this.save.emit(this.productForm.value);
            this.router.navigate(['/products']);
          },
          error: (err) => {
            console.error('Error al agregar producto:', err);
          }
        });
      }
    }
  }

  onCancel() {
    this.cancel.emit();
    this.router.navigate(['/products']);
  }
}
