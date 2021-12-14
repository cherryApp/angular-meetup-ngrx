import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  items: ITableCol[] = this.config.productTableColumns;

  product$: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap( params => this.productService.read(params['id']) ),
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private config: ConfigService,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(product: Product): void {
    this.productService.update(product).subscribe(
      product => this.router.navigate(['/', 'products']),
    );
  }

}
