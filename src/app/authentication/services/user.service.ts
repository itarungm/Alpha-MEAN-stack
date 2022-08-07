import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private ROOT_URL = "http://localhost:4000/api/users";
  private token: string;
  constructor(private http:HttpClient,private router:Router) { }

  register(username: string, email:string,avatar: File,userRole:String,password:string){
    var formData: any = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("avatar", avatar);
    formData.append("userRole", userRole);
    formData.append("password", password);
    
    return this.http.post<User>(`${this.ROOT_URL}/register`,formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.ROOT_URL);
  }
  
  getUser(id:String){
    return this.http.get<User>(`${this.ROOT_URL}/${id}`)
  }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  login(user){
    return this.http.post<any>(`${this.ROOT_URL}/login`,user)
  }
  logOut() {
    localStorage.removeItem("token");
    this.router.navigate(["/posts"]); 
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }
  tokenMatch;
  // data = this.getUserDetails();
  // username = this.data["user"][0]["username"];
   
  getUserDetails(): User {
    
    const token = localStorage.getItem("token");
    if(!token){
      return null;
    }
    console.log(token);
      let payload;
      payload = token?.split('.')[1];
      payload = window.atob(payload);
      this.tokenMatch = payload;
      let finalData:any = JSON.parse(payload)
      return finalData;
  }
}
