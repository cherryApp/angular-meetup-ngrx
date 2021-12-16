import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { MoviesComponent } from './page/movies/movies.component';
import { UsersComponent } from './page/users/users.component';
import { ProductsComponent } from './page/products/products.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { HeaderComponent } from './common/header/header.component';
import { TableComponent } from './common/table/table.component';
import { UserEditorComponent } from './page/user-editor/user-editor.component';
import { ProductEditorComponent } from './page/product-editor/product-editor.component';
import { FormComponent } from './common/form/form.component';
import { productReducer } from './state/product/product.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product/product.effects';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MoviesComponent,
    UsersComponent,
    ProductsComponent,
    NavigationComponent,
    HeaderComponent,
    TableComponent,
    UserEditorComponent,
    ProductEditorComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      products: productReducer,
      router: routerReducer,
    }),
    EffectsModule.forRoot([ ProductEffects ]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
