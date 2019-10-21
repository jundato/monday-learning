import { Action } from "@ngrx/store";
import { Account } from '@app/services/account/account.model';
import { AccountState, initialState } from "../states/account.state";

import * as actions from '../actions/account.action'

export function accountReducer(
    state = initialState,
    action: Action
  ): AccountState {
    switch (action.type) {
        case actions.SET_LOGIN:
            return setLogin(state, action);
        case actions.SET_SELECTED_THREAD_ID:
            return setSelectedThreadId(state, action);
        case actions.GET_ALL_ACCOUNTS_SUCCESSFUIL:
            return setAccounts(state, action);
        case actions.GET_ALL_THREADS_SUCCESSFUL:
            return setThreads(state, action);
        default:
            return state;
    }
}

function setAccounts (state: AccountState, action: Action): AccountState{
    const accounts: Account[] = (action as actions.GetAllAccountsSuccessful).accounts;
    return {
        ...state,
        accounts: accounts
    }
}

function setThreads(state: AccountState, action: Action): AccountState {
    const threads =  (action as actions.GetAllThreadsSuccessful).threads;
    return {
        ...state,
        threads: threads
    }
}

function setLogin(state: AccountState, action: Action): AccountState {
    return {
        ...state,
        loggedInAs: (action as actions.SetLogin).loggedInAs
    }
}

function setSelectedThreadId(state: AccountState, action: Action): AccountState {
    console.log((action as actions.SetSelectedThreadId).selectedThreadId);
    return {
        ...state,
        selectedThreadId: (action as actions.SetSelectedThreadId).selectedThreadId
    }
}
