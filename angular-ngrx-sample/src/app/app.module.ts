import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { MoviesComponent } from './page/movies/movies.component';
import { UsersComponent } from './page/users/users.component';
import { ProductsComponent } from './page/products/products.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { HeaderComponent } from './common/header/header.component';
import { TableComponent } from './common/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MoviesComponent,
    UsersComponent,
    ProductsComponent,
    NavigationComponent,
    HeaderComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
