import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { LoginRedirectGuard } from './guards/login-redirect.guard';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { path: 'login', 
    component: LoginComponent, canActivate: [LoginRedirectGuard]
  },
  { path: 'home', 
    component: HomeComponent, canActivate: [AuthGuard] 
  },
  { path: 'products', 
    component: ProductListComponent, canActivate: [AuthGuard] 
  },
  { path: 'add', 
    component: ProductFormComponent, canActivate: [AuthGuard] 
  },
  { path: 'edit/:id', 
    component: ProductFormComponent, canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
