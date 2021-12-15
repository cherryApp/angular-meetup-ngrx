import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/model/product';

export const addProduct = createAction(
  '[Product List] Add Product',
  props<{ ProductId: string }>()
);

export const removeProduct = createAction(
  '[Product Collection] Remove Product',
  props<{ id: string }>()
);

export const retrievedProductList = createAction(
  '[Product List/API] Retrieve Products Success',
  props<{ products: ReadonlyArray<Product> }>()
);
