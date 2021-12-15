import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/model/product';

export const addProduct = createAction(
  '[Product List] Add Product',
  props<{ id: number }>()
);

export const loadItem = createAction(
  '[Product] Get Product',
  props<{ item: Product }>()
);

export const removeProduct = createAction(
  '[Product Collection] Remove Product',
  props<{ id: number }>()
);

export const loadItems = createAction(
  '[Product List/API] Retrieve Products Success',
  props<{ items: ReadonlyArray<Product> }>()
);
