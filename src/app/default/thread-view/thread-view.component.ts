import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { AppState } from '@app/store/states';
import { Store } from '@ngrx/store';
import { accountsSelector, loggedInAsSelector } from '@app/store/selectors/accounts.selector';
import { Subscription } from 'rxjs';
import { Account, Thread} from '@app/store/states/account.state'


@Component({
  selector: 'app-thread-view',
  templateUrl: './thread-view.component.html',
  styleUrls: ['./thread-view.component.scss']
})
export class ThreadViewComponent {

  accounts: Account[];
  loggedInAs: string;

  @Input() thread: Thread;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>
  ) {
    this.subscriptions = [
      this.store.select(accountsSelector).subscribe(accounts => {
        this.accounts = accounts;
      }),
      this.store.select(loggedInAsSelector).subscribe(loggedInAs => {
        this.loggedInAs = loggedInAs;
      })
    ]
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public GetName(id: string): string{
    return this.accounts.filter(x => x.id === id).map(x => `${x.lastname}, ${x.firstname}`)[0];
  }

  public GetNameInitials(id: string): string {
    return this.accounts.filter(x => x.id === id).map(x => `${x.firstname[0]}${x.lastname[0]}`)[0];
  }
}