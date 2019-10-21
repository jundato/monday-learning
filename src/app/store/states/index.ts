import { RouterStateUrl } from './router.state';
import * as fromRouter from '@ngrx/router-store';
import { AccountState } from './account.state';
export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  account: AccountState;
}