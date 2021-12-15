import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';
import { AppState } from 'src/app/state/app.state';
import { loadItem } from 'src/app/state/product/actions';
import { selectOneProduct } from 'src/app/state/product/selectors';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  items: ITableCol[] = this.config.productTableColumns;

  product$: Observable<Product | null> = this.store.select(selectOneProduct);

  constructor(
    private activatedRoute: ActivatedRoute,
    private config: ConfigService,
    private productService: ProductService,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap( params => this.productService.read(params['id']) ),
    ).subscribe(
      item => this.store.dispatch(loadItem({ item }))
    );
  }

  onUpdate(product: Product): void {
    this.productService.update(product).subscribe(
      product => this.router.navigate(['/', 'products']),
    );
  }

}
