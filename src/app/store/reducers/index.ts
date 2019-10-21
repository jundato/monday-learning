import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { AppState } from '../states';
import { accountReducer } from './accounts.reducer';

export const reducers: ActionReducerMap<AppState> = {
    router: fromRouter.routerReducer,
    account: accountReducer
};
