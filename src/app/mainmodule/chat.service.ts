import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage } from './Data/datamodel';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private connection!: signalR.HubConnection;
  private messages$ = new BehaviorSubject<ChatMessage[]>([]);
  public messages = this.messages$.asObservable();

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5296/chathub', { withCredentials: true })
      .withAutomaticReconnect()
      .build();

    this.connection.on('ReceiveHistory', (history: ChatMessage[]) => {
      this.messages$.next(history);
    });

    this.connection.on('ReceiveMessage', (msg: ChatMessage) => {
      this.messages$.next([...this.messages$.value, msg]);
    });

    this.connection.start().catch(err =>
      console.error('SignalR connection failed:', err)
    );
  }

  sendMessage(msg: ChatMessage) {
    this.connection.invoke('SendMessage', msg.user, msg.message)
      .catch(err => console.error('Error sending message:', err));
  }
}
