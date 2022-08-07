import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { Posting } from '../model/posting';

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  private ROOT_URL = "http://localhost:4000/api/posts/"
  constructor(private http:HttpClient) { }

  // headers = new HttpHeaders().set('Content-Type', 'application/json');
   // Http Options
   private httpOptions = {
    headers: new HttpHeaders()
      // .set("Content-Type", "application/json")
      .set("auth-token", localStorage.getItem("token"))
  };
  
  getListings(): Observable<Posting[]>{
    return this.http.get<Posting[]>(this.ROOT_URL);
  }

  getListing(id:String){
    return this.http.get<Posting>(`${this.ROOT_URL}/${id}`)
  }

  addListing(title: String,desc: String,author: String,category: String,created_at: Date,avatar: File,token:String): Observable<any> {
    var formData: any = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("created_at", created_at);
    formData.append("avatar", avatar);
    formData.append("token", token);


    return this.http.post<Posting>(this.ROOT_URL,formData,this.httpOptions);
  }

  editListing(listing, id: string) {
    return this.http.put<any>(
      `${this.ROOT_URL}/${id}`,
      listing,
      this.httpOptions
    );
  }

  deleteListing(id: string) {
    return this.http.delete(`${this.ROOT_URL}/${id}`, this.httpOptions);
  }

  // Error Management
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
