import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ProductEditorComponent } from './page/product-editor/product-editor.component';
import { ProductsComponent } from './page/products/products.component';
import { UserEditorComponent } from './page/user-editor/user-editor.component';
import { UsersComponent } from './page/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users/edit/:id',
    component: UserEditorComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/edit/:id',
    component: ProductEditorComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
