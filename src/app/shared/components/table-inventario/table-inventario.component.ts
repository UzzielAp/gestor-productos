import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-table-inventario',
  standalone: false,

  templateUrl: './table-inventario.component.html',
  styleUrl: './table-inventario.component.css'
})
export class TableInventarioComponent {
  @Input()  dataSource: Product[] = [];
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  displayedColumns: string[] = ['name', 'price', 'descripcion', 'actions'];

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onEdit(id: number) {
    this.edit.emit(id);
  }
}
