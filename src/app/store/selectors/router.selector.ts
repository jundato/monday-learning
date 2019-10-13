import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl, RouterStateType } from '../states/router.state';
export { routerReducer } from '@ngrx/router-store';

export const name = 'router';
export const getRouterState = createFeatureSelector<RouterStateUrl>(name);

export const paramsId = createSelector(
  getRouterState,
  (state: any) => {
    if (state) {
      return state.state.params.id;
    } else {
      return null;
    }
  }
);