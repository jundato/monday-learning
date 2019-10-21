import { Action } from "@ngrx/store";
import { Account } from '@app/services/account/account.model'
import { Thread } from "@app/services/account/thread.model";

export const SET_LOGIN = '[accounts] set login';
export class SetLogin  implements Action {
    readonly type = SET_LOGIN;

    constructor(public loggedInAs:string){}
}

export const SET_SELECTED_THREAD_ID = '[accounts] set selected thread id';
export class SetSelectedThreadId  implements Action {
    readonly type = SET_SELECTED_THREAD_ID;

    constructor(public selectedThreadId:string){}
}

export const GET_ALL_ACCOUNTS = '[accounts] get all accounts';
export class GetAllAccounts implements Action
{
    readonly type = GET_ALL_ACCOUNTS;
}

export const GET_ALL_ACCOUNTS_SUCCESSFUIL = '[accounts] get all accounts successful';
export class GetAllAccountsSuccessful implements Action {
    readonly type = GET_ALL_ACCOUNTS_SUCCESSFUIL;

    constructor(public accounts: Account[]){}
}

export const GET_ALL_THREADS = '[accounts] get all threads';
export class GetAllThreads implements Action {
    readonly type = GET_ALL_THREADS;

    constructor(public id: string){}
}

export const GET_ALL_THREADS_SUCCESSFUL = '[accounts] get all threads successful';
export class GetAllThreadsSuccessful implements Action {
    readonly type = GET_ALL_THREADS_SUCCESSFUL;

    constructor(public threads: Thread[]){}
}

export const SEND_MESSAGE = '[accounts] get send message';
export class SendMessage implements Action {
    readonly type = SEND_MESSAGE;
    constructor(public text: string){}
}

export const SEND_MESSAGE_SUCCESSFUL = '[accounts] get send message successful';
export class SendMessageSuccessful implements Action {
    readonly type = SEND_MESSAGE_SUCCESSFUL;
    constructor(){}
}

export type Actions =
    | SetLogin
    | GetAllAccounts
    | GetAllAccountsSuccessful
    | GetAllThreads
    | GetAllThreadsSuccessful
    | SendMessage
    | SendMessageSuccessful