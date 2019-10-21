import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState } from '../states/account.state';

export const name = 'account';
export const accountSelector = createFeatureSelector<AccountState>(name);

export const accountsSelector = createSelector(
    accountSelector,
    (state: AccountState) => state.accounts
);

export const threadsSelector = createSelector(
    accountSelector,
    (state: AccountState) => state.threads
)

export const loggedInAsSelector = createSelector(
    accountSelector,
    (state: AccountState) => state.loggedInAs
)

export const selectedThreadIdSelector = createSelector(
    accountSelector,
    (state: AccountState) => state.selectedThreadId
)