import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { distinctUntilChanged, filter, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';
import { getItem, loadItem, sendItemUpdate } from 'src/app/state/product/product.actions';
import { disposedSelector, selectOneProduct } from 'src/app/state/product/product.selectors';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit, OnDestroy {

  endObservers: Subject<boolean> = new Subject();

  items: ITableCol[] = this.config.productTableColumns;

  id: number = 0;

  product$: Observable<Product | null> = this.store.pipe(
    select(selectOneProduct),
    filter( product => product && product.id === Number(this.id) ),
  );

  constructor(
    private ar: ActivatedRoute,
    private config: ConfigService,
    private productService: ProductService,
    private router: Router,
    private store: Store,
  ) { }

  async ngOnInit() {
    this.id = this.ar.snapshot.params['id'];
    this.store.dispatch(getItem({id: this.id}));
  }

  onUpdate(product: Product): void {
    this.store.dispatch(sendItemUpdate({item: product}));
    this.router.navigate(['/', 'products']);
  }

  ngOnDestroy(): void {
      this.endObservers.next(false);
  }

}
