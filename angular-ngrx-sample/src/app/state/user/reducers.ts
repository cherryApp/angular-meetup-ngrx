import { createReducer, on } from '@ngrx/store';

import { retrievedProductList } from './actions';
import { Product } from 'src/app/model/product';

export const initialState: ReadonlyArray<Product> = [];

export const productReducer = createReducer(
  initialState,
  on(retrievedProductList, (state, { products }) => products),
);
