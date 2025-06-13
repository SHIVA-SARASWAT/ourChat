import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Message } from 'stream-chat';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  loggedInUser = localStorage.getItem('currentUser');
  constructor(private db:AngularFireDatabase) { }
  sendMessage(text: string) {
    this.db.list('/messages').push({
      text,
      createdAt: new Date().toString(),
      sender:this.loggedInUser
    });
    
  }
  getMessages() {
    return this.db.list('/messages').valueChanges() as Observable<Message[]>;
  }
}
