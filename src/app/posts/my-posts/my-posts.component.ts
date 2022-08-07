import { Component, OnInit } from '@angular/core';
import { Posting } from '../model/posting';
import { Observable } from 'rxjs';
import { PostingService } from '../services/posting.service';
import { UserService } from 'src/app/authentication/services/user.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  
  postings$: Observable<Posting[]>
data;email;
  constructor(private postingService:PostingService, private userService:UserService) {
    this.data = this.userService.getUserDetails();
      this.email = this.data["user"][0]["email"];
   }

   public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  
  ngOnInit() { 
    this.loadScript('../../../assets/js/jquery-3.3.1.min.js');
      this.loadScript('../../../assets/js/bootstrap.min.js');

    this.postings$ = this.postingService.getListings();

   
  }
 

}
