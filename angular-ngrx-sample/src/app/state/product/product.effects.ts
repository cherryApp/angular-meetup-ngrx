import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { ProductService } from 'src/app/service/product.service';
import * as fromActions from './product.actions';
import { switchMap, catchError, tap, withLatestFrom, mergeMap, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Injectable()
export class ProductEffects {
  getItems$ = createEffect( (): Observable<Action> => {
    return this.actions$.pipe(
      ofType(fromActions.getItems),
      switchMap( () => this.httpService.readAll() ),
      map( items => ({
        type: fromActions.NAMES.RETRIEVE_ITEMS_SUCCESS,
        items: items
      })),
      catchError( error => of({ type: fromActions.NAMES.ERROR_ITEM, error })),
    );
  });

  getItem$ = createEffect( (): Observable<Action> => {
    return this.actions$.pipe(
      ofType(fromActions.getItem),
      switchMap( action => this.httpService.read(action.id) ),
      map( item => ({ type: fromActions.NAMES.LOAD_ITEM, item }) ),
      catchError( error => of({ type: fromActions.NAMES.ERROR_ITEM, error })),
    );
  });

  updateItem$ = createEffect( (): Observable<Action> => {
    return this.actions$.pipe(
      ofType(fromActions.sendItemUpdate),
      switchMap( action => this.httpService.update(action.item) ),
      map( () => ({ type: fromActions.NAMES.RETRIEVE_ITEMS })),
      catchError( error => of({ type: fromActions.NAMES.ERROR_ITEM, error })),
    );
  });

  deleteItem$ = createEffect( (): Observable<Action> => {
    return this.actions$.pipe(
      ofType(fromActions.sendItemDelete),
      switchMap( action => this.httpService.delete(action.id) ),
      map( () => ({ type: fromActions.NAMES.RETRIEVE_ITEMS })),
      catchError( error => of({ type: fromActions.NAMES.ERROR_ITEM, error })),
    );
  });

  // addItem$ = createEffect( (): Observable<Action> => {
  //   let lastAcion = null;
  //   return this.actions$.pipe(
  //     ofType(addItem),
  //     tap( action => lastAcion = action ),
  //     mergeMap( action => this.httpService.create(action.item).pipe(
  //       switchMap( () => this.httpService.read(lastAcion.item.id) ),
  //       map( user => ({ type: LOAD_ADDED_ITEM, item: user })),
  //       catchError( error => of({ type: ERROR_ITEM, error })),
  //     ) ),
  //   );
  // });

  // deleteItem$ = createEffect( (): Observable<Action> => {
  //   let lastAcion = null;
  //   return this.actions$.pipe(
  //     ofType(deleteItem),
  //     tap( action => lastAcion = action ),
  //     switchMap( action => this.httpService.delete(action.item) ),
  //     map( user => ({ type: REMOVE_ITEM, item: lastAcion.item })),
  //     catchError( error => of({ type: ERROR_ITEM, error })),
  //   );
  // });

  constructor(
    private actions$: Actions,
    private httpService: ProductService,
    private store$: Store<any>,
    private ar: ActivatedRoute,
  ) { }

}
