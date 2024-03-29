import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/states';
import { Account, Thread } from '@app/store/states/account.state'
import { accountsSelector } from '@app/store/selectors/accounts.selector';
import { SetLogin } from '@app/store/actions/account.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  
  accounts: Account[];

  subscriptions: Subscription[] = [];
  loggedInAs = 'CaQtPlDaYL3LS0w5G7Cx';

  constructor(
    private store: Store<AppState>,
  ) {
    this.subscriptions = [
      this.store.select(accountsSelector).subscribe(accounts => {
        this.accounts = accounts;
      })
    ]
  }

  ngOnInit(){
  }

  setLogin(event){
    this.store.dispatch(new SetLogin(event.value));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
