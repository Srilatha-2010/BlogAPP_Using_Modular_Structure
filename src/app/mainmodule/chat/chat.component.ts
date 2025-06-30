import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as signalR from '@microsoft/signalr';
import { BlogComponent } from '../blog/blog.component';
import { PersonalchatComponent } from '../personalchat/personalchat.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
@ViewChild('scrollMe') scrollMe!: ElementRef;
  form: FormGroup;
  connection!: signalR.HubConnection;
  messages: { user: string; message: string }[] = [];
  joined = false;
  user = '';
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      user: [''],
      message: ['']
    });
  }

  ngOnInit(): void {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5296/chathub')
      .withAutomaticReconnect()
      .build();

    this.connection.on('ReceiveMessage', (msg: any) => {
      this.messages.push({ user: msg.user, message: msg.message });
    });

    this.connection.on('ReceiveHistory', (history: any[]) => {
      this.messages = history.map(msg => ({
        user: msg.user,
        message: msg.message
      }));
  });

    this.connection.start().catch(console.error);
  }

  join(): void {
    this.user = this.form.get('user')?.value;
    this.joined = true;
  }

  send(): void {
    const message = this.form.get('message')?.value;
    if (!message) return;

    this.connection.invoke('SendMessage', this.user, message).catch(console.error);
    this.form.get('message')?.reset();
  }

}
