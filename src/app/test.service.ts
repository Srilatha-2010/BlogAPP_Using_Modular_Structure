import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, Data } from './mainmodule';


@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'http://localhost:5296/api/posts';

  constructor(private http: HttpClient) {} 


  addPost(post: Post): Observable<Post> {
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


 hidedata(post: Post): Observable<any> {
  return this.http.put(`${this.apiUrl}/hide`, post); 
}


}
