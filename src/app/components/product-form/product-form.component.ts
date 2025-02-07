import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: false,

  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Product>();

  get name() {
    return this.productForm.get('name') as FormControl
  }

  get price() {
    return this.productForm.get('price') as FormControl
  } 

  get descripcion() {
    return this.productForm.get('descripcion') as FormControl
  }

  productForm: FormGroup;
  @Input() editingProduct: Product | null = null;

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
      const product = this.productService.getProductById(+productId)
      this.editingProduct = product !== undefined ? product : null;
      if (this.editingProduct) {
        this.productForm.setValue(this.editingProduct)
      }
    }
  }

  ngOnChanges(){
    if (this.editingProduct) {
      this.productForm.setValue(this.editingProduct);
    }
  }

  submit() {
    if (this.productForm.valid){
      if (this.editingProduct) {
        this.productService.updateProduct(this.productForm.value);
      } else {
        this.productForm.value.id = Math.random();
        this.productService.addProduct(this.productForm.value);
      }
      this.save.emit(this.productForm.value);
      this.router.navigate(['/products'])
    }
  }

  onCancel() {
    this.cancel.emit();
    this.router.navigate(['/products']);
  }
}
