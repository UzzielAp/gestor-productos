import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  standalone: false,

  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'descripcion', 'actions'];
  dataSource = new MatTableDataSource<Product>();

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.dataSource.data = this.productService.getProducts();
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
    this.dataSource.data = this.productService.getProducts();
  }

  navigateToAdd() {
    this.router.navigate(['/add']);
  }

  navigateToEdit(id: number) {
    this.router.navigate(['/edit', id]);
  }
}
