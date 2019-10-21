import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AppState } from '@app/store/states';
import { Store } from '@ngrx/store';
import { accountsSelector } from '@app/store/selectors/accounts.selector';
import { Subscription } from 'rxjs';
import { Account } from '@app/store/states/account.state'
import { SetLogin } from '@app/store/actions/account.action';

@Component({
  selector: 'app-page-route',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {

  accounts: Account[];

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>
  ) {
    this.subscriptions = [
      this.store.select(accountsSelector).subscribe(accounts => {
        this.accounts = accounts;
      })
    ]
  }

  ngOnInit(){
    this.store.dispatch(new SetLogin('CaQtPlDaYL3LS0w5G7Cx'));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}