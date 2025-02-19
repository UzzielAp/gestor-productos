import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,
  
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }

  navigateToAdd() {
    this.router.navigate(['/add']);
  }

  navigateToEdit(id: number) {
    this.router.navigate(['/edit', id]);
  }
}
