import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  cols: ITableCol[] = this.config.productTableColumns;

  list$: Observable<Product[]> = this.productService.readAll();

  constructor(
    private config: ConfigService,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onEdit(product: Product): void {
    this.router.navigate(['/', 'products', 'edit', product.id]);
  }

}
