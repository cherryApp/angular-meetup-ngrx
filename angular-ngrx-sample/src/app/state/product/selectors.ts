import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Product } from 'src/app/model/product';
import { AppState } from '../app.state';
import { State } from './reducers';

export const selectProducts = createFeatureSelector<ReadonlyArray<Product>>('products');

export const selectOneProduct = (state: State) => state.users.selected

// export const selectOneProduct = createSelector(
//   selectProducts,
//   (products) => {
//     return products.find( product => product.id === props.id ) || new Product();
//   });
