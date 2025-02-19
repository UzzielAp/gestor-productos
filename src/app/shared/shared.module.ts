import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TableInventarioComponent } from './components/table-inventario/table-inventario.component';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    TableInventarioComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggle, 
    MatButtonToggleGroup, 
    MatTableModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    TableInventarioComponent,
  ]
})
export class SharedModule { }
