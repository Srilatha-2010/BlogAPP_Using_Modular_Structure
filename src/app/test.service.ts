import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, Data } from './mainmodule';
import { Messaging } from '@angular/fire/messaging';
import { getToken, onMessage } from 'firebase/messaging';
@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'http://localhost:5296/api/posts';
  private username: string = '';

  constructor(
    private http: HttpClient,private messaging: Messaging
  ) {}

  addPost(post: FormData): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  checkLogin(data: Data): Observable<boolean> {
    const params = new HttpParams()
      .set('user', data.user)
      .set('password', data.pwd);
    return this.http.get<boolean>(`${this.apiUrl}/login`, { params });
  }
    setuser(name:string){  // callig at blogcomponent
      return this.username=name
    } 

    getusername(){
      return this.username // calling at personal component
    }

    // all the users except him/her
    loginUser(username: string): Observable<Data[]> {
      const params = new HttpParams().set('username', username);
      return this.http.get<Data[]>(`${this.apiUrl}/users`, { params });
    }

    hidedata(data: { id: number, hide: boolean }) {
      return this.http.put('http://localhost:5296/api/posts/hide', data);
    }
  requestPermission() {
    getToken(this.messaging, {
      vapidKey: 'BHUOfGcXAB8yGeuDSJgQUsrjp64Xp-GN5F7JXYG9dNFad2Ecl5Pr2LDcrDmJsbU57QZ_MwL6KHTwpVn5F8IoCRY' 
    }).then((token) => {
      console.log('FCM Token:', token);
     
    }).catch((err) => {
      console.error('Error getting token:', err);
    });
  }

  listenForMessages() {
  onMessage(this.messaging, (payload) => {
    console.log('Message received: ', payload);
    const title = payload.notification?.title || 'New Message';
    const body = payload.notification?.body || '';
    this.shownotify(title, body);
  });
}
  shownotify(title:string,body:string):void {
    if(Notification.permission==='granted') {
      new Notification(title,{body});
    }
  }
searchPosts(post: Post): Observable<Post[]> {
  return this.http.post<Post[]>(`${this.apiUrl}/search`, post);
}


}
