import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { AppState } from '@app/store/states';
import { Store } from '@ngrx/store';
import { accountsSelector, selectedThreadIdSelector, threadsSelector } from '@app/store/selectors/accounts.selector';
import { Subscription } from 'rxjs';
import { Account, Thread } from '@app/store/states/account.state'
import { FormGroup, FormBuilder } from '@angular/forms';
import { SendMessage } from '@app/store/actions/account.action';

@Component({
  selector: 'app-conversation-view',
  templateUrl: './conversation-view.component.html',
  styleUrls: ['./conversation-view.component.scss']
})
export class ConversationViewComponent {

  accounts: Account[];
  subscriptions: Subscription[] = [];

  threads: Thread[];
  selectedThreadId: string;

  form: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) {
    this.subscriptions = [
      this.store.select(accountsSelector).subscribe(accounts => {
        this.accounts = accounts;
      }),
      this.store.select(threadsSelector).subscribe(threads => {
        this.threads = threads;
      }),
      this.store.select(selectedThreadIdSelector).subscribe(selectedThreadId => {
        this.selectedThreadId = selectedThreadId;
      }),
    ]
  }

  ngOnInit(){
    this.form = this.fb.group({
      textToSend: '',
  });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getSelectedThread(){
    return this.threads.some(x => x.id === this.selectedThreadId) ? this.threads.find(x => x.id === this.selectedThreadId) : {
      id: '',
      lastSeenBy: [],
      messages: [],
      participants: []
    }
  }

  onClickSend(){
    this.store.dispatch(new SendMessage(this.form.value.textToSend))
    this.form.patchValue({textToSend: ''})
  }

}