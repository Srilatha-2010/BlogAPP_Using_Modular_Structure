import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/test.service';

@Component({
  selector: 'app-personalchat',
  templateUrl: './personalchat.component.html',
  styleUrls: ['./personalchat.component.css']
})
export class PersonalchatComponent implements OnInit {

  data: any;
  username: string = '';

  constructor(private ts: TestService) {}

  ngOnInit(): void {
    this.username = this.ts.getusername();
    console.log('Logged in user:', this.username);

    if (!this.username || this.username.trim() === '') {
      console.warn('Username is empty. Not calling API.');
      return;
    }

    this.ts.loginUser(this.username).subscribe(res => {
      this.data = res;
      console.log('User data:', this.data);
    }, err => {
      console.error('API error:', err);
    });
  }
selectedIndex: number | null = null;
name='';
buttonClick(index: number, event: Event): void {
  this.selectedIndex = index;
  const button = event.target as HTMLButtonElement;
  console.log('Clicked user:', button.innerText);
  this.name=button.value;
}
contacts(){
  this.name=''
  this.selectedIndex=null
}

}


   

 


