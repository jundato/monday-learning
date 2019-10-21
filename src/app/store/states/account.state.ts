export interface Account {
    id: string;
    firstname: string;
    lastname: string;
}

export interface Thread{
    id: string;
    lastSeenBy: string[];
    messages: Message[];
    participants: string[];
}

export interface Message{
    text: string;
    timestamp: string;
    author: string;
}

export interface AccountState {
    loggedInAs: string;
    accounts: Account[],
    threads: Thread[],
    selectedThreadId: string;
}

export const initialState: AccountState = {
    loggedInAs: '',
    accounts: [],
    threads: [],
    selectedThreadId: '',
}