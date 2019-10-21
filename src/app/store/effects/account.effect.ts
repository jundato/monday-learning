import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { AppState } from '../states/index';
import { Observable, from, of } from 'rxjs';

import * as actions from '../actions/account.action';
import { debounceTime, tap, switchMap, map, withLatestFrom } from 'rxjs/operators';
import { AccountService } from '@app/services/account/account.service';
import { loggedInAsSelector, selectedThreadIdSelector, threadsSelector } from '../selectors/accounts.selector';

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private accountService: AccountService
  ) {}

  @Effect()
  getAllAccounts$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_ALL_ACCOUNTS),
    debounceTime(300),
    switchMap(() => 
      from(this.accountService.getAll().pipe(map(accounts => {
          return new actions.GetAllAccountsSuccessful(accounts);
      })))
    )
  );

  @Effect()
  getAllThreads$: Observable<Action> = this.actions$.pipe(
    ofType(actions.GET_ALL_THREADS),
    debounceTime(300),
    map(action => (action as actions.GetAllThreads).id),
    switchMap((id) => 
      from(this.accountService.getThreads(id).pipe(map(threads => {
          return new actions.GetAllThreadsSuccessful(threads);
      })))
    )
  );

  @Effect()
  sendMessage$: Observable<Action> = this.actions$.pipe(
    ofType(actions.SEND_MESSAGE),
    debounceTime(300),
    map(action => (action as actions.SendMessage).text),
    withLatestFrom(this.store.select(loggedInAsSelector), this.store.select(selectedThreadIdSelector), this.store.select(threadsSelector)),
    switchMap(([text, author, selectedThreadId, threads]) => 
      from(this.accountService.sendMessage(threads.find(x => selectedThreadId === x.id), { author, text })).pipe(map(() => { return new actions.SendMessageSuccessful()}))
  ))
}
