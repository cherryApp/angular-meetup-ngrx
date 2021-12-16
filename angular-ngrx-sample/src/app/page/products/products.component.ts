import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';
import { getItems, loadItems, sendItemDelete } from 'src/app/state/product/product.actions';
import { selectProducts } from 'src/app/state/product/product.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  cols: ITableCol[] = this.config.productTableColumns;

  list$: Observable<readonly Product[]> = this.store.pipe( select(selectProducts) );

  constructor(
    private config: ConfigService,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getItems());
  }

  onEdit(product: Product): void {
    this.router.navigate(['/', 'products', 'edit', product.id]);
  }

  onDelete(product: Product): void {
    this.store.dispatch(sendItemDelete({id: product.id}));
  }

}
