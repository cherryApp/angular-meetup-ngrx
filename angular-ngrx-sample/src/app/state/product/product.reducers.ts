import { createReducer, on } from '@ngrx/store';

import { loadItems, loadItem } from './product.actions';
import { Product } from 'src/app/model/product';

export interface State {
  [x: string]: any;
  products: { items: Product[], selected: Product | null, error: any };
}

export const initialState: State = {
  products: { items: [], selected: null, error: null }
};

export const productReducer = createReducer(
  initialState,
  on(loadItems, (state, action) => ({
    ...state,
    items: action.items
  })),
  on(loadItem, (state, action) => ({
      ...state,
      selected: action.item
  })),
);
