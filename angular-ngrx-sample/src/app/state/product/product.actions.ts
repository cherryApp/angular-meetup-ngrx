import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/model/product';

export const NAMES = {
  ADD_ITEM: '[Product List] Add Product',
  LOAD_ITEM: '[Product] Load Product',
  REMOVE_ITEM: '[Product Collection] Remove Product',
  UPDATE_ITEM: '[Product] Update Product',
  RETRIEVE_ITEMS_SUCCESS: '[Product List/API] Retrieve Products Success',
  ERROR_ITEM: '[Product List/API] Error',

  RETRIEVE_ITEMS: '[Product List/API] Retrieve Products',
  RETRIEVE_ITEM: '[Product List/API] Retrieve Product',
  SEND_ITEM_UPDATE: '[Product List/API] Send Product Update',
  SEND_ITEM_DELETE: '[Product List/API] Send Product Delete',

  LOG_EVENT: '[Product] Log Event',
}

// Reducer actions.
export const loadItem = createAction(
  NAMES.LOAD_ITEM,
  props<{ item: Product }>()
);

export const loadItems = createAction(
  NAMES.RETRIEVE_ITEMS_SUCCESS,
  props<{ items: ReadonlyArray<Product> }>()
);

export const addItem = createAction(
  NAMES.ADD_ITEM,
  props<{ item: Product }>()
);

export const updateItem = createAction(
  NAMES.UPDATE_ITEM,
  props<{ item: Product }>()
);

export const removeItem = createAction(
  NAMES.REMOVE_ITEM,
  props<{ id: number }>()
);

// Effect actions.
export const getItems = createAction(
  NAMES.RETRIEVE_ITEMS,
);

export const getItem = createAction(
  NAMES.RETRIEVE_ITEM,
  props<{id: number}>()
);

export const sendItemUpdate = createAction(
  NAMES.SEND_ITEM_UPDATE,
  props<{item: Product}>()
);

export const sendItemDelete = createAction(
  NAMES.SEND_ITEM_DELETE,
  props<{id: number}>()
);

// Log.
export const logEvent = createAction(
  NAMES.LOG_EVENT,
  props<{message: string}>(),
);
