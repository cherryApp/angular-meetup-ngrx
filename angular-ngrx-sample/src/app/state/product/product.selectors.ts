import { State } from './product.reducers';
import { selectRouteParams } from '../router.selectors';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from 'src/app/model/product';

export const productsFeatureSelector = createFeatureSelector<State>('products');

export const selectProducts = (state: State) => state.products.items;

export const selectOneProduct = (state: State) => state.products.selected;

export const disposedSelector = createSelector(
  productsFeatureSelector,
  selectRouteParams,
  (state, { id }) => {
    console.log(state, id);
    return state['items'].find( p => p.id === id ) || state.products.selected;
  },
);
