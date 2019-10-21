import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AppState } from '@app/store/states';
import { Store } from '@ngrx/store';
import { accountsSelector, threadsSelector, loggedInAsSelector, selectedThreadIdSelector } from '@app/store/selectors/accounts.selector';
import { Subscription } from 'rxjs';
import { Account } from '@app/store/states/account.state'
import { Thread } from '@app/store/states/account.state'
import { GetAllThreadsSuccessful, GetAllThreads, SetSelectedThreadId } from '@app/store/actions/account.action';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent {
  accounts: Account[];
  threads: Thread[];
  loggedInAs: string;
  selectedThreadId: string;

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>
  ) {
    this.subscriptions = [
      this.store.select(accountsSelector).subscribe(accounts => {
        this.accounts = accounts;
      }),
      this.store.select(threadsSelector).subscribe(threads => {
        this.threads = threads;
      }),
      this.store.select(loggedInAsSelector).subscribe(loggedInAs => {
        this.loggedInAs = loggedInAs;
        this.store.dispatch(new GetAllThreads(loggedInAs));
      }),
      this.store.select(selectedThreadIdSelector).subscribe(selectedThreadId => {
        this.selectedThreadId = selectedThreadId
      })
    ]
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public GetName(id: string): string{
    return this.accounts.filter(x => x.id === id).map(x => `${x.firstname} ${x.lastname}`)[0];
  }

  public GetParticipantsText(thread: Thread): string{
    return thread.participants.filter(x => x !== this.loggedInAs).map(y => this.GetName(y)).join(', ');
  }

  public onSelectThread(selectedThreadId: string){
    this.store.dispatch(new SetSelectedThreadId(selectedThreadId));
  }
}