import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from './account.model';
import { Thread } from './thread.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  dialogReference: MatDialogRef<any, any>;

  constructor(
    private fs: AngularFirestore
  ) {}

  getAll(): Observable<Account[]>{
      return this.fs.collection('accounts')
        .snapshotChanges()
        .pipe(
          map(actions => actions.map(action => {
            const payload = action.payload.doc.data() as Account;
            return {
              id: action.payload.doc.ref.id,
              firstname: payload.firstname,
              lastname: payload.lastname
            }}
          )));
  }

  getThreads(id: string): Observable<Thread[]>{
    console.log(id);
    return this.fs.collection('threads', ref => ref.where('participants', 'array-contains', id)).snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const payload = action.payload.doc.data() as Thread;
        console.log(payload);
        return {
          id: action.payload.doc.ref.id,
          messages: payload.messages,
          lastSeenBy: payload.lastSeenBy,
          participants: payload.participants
        }
      }))
    );
  }

  sendMessage(thread: Thread, {text, author}) : Observable<any>{
    const messages = [...thread.messages ? thread.messages: [], { author:author, text:text}].map((obj) => { return Object.assign({}, obj)})
    return from(this.fs.collection('threads').doc(thread.id).set({ 
      messages: messages }, {merge: true}));
  }
}
