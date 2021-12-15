import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';
import { loadItems } from 'src/app/state/product/actions';
import { selectProducts } from 'src/app/state/product/selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  cols: ITableCol[] = this.config.productTableColumns;

  list$: Observable<readonly Product[]> = this.store.select(selectProducts);

  constructor(
    private config: ConfigService,
    private productService: ProductService,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.productService.readAll().subscribe(
      items => this.store.dispatch(loadItems({ items }))
    );
  }

  onEdit(product: Product): void {
    this.router.navigate(['/', 'products', 'edit', product.id]);
  }

}
