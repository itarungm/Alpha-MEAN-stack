import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Posting } from 'src/app/posts/model/posting';
import { Observable } from 'rxjs';
import { PostingService } from 'src/app/posts/services/posting.service';
import { UserService } from 'src/app/authentication/services/user.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {
  postings$: Observable<Posting[]>
  data;username;avatar;
  constructor(private router: Router,private postingService:PostingService,private userService:UserService) {}

  isHomeRoute() {
    return this.router.url === '/';
  }
  isPostDetail() {
    return this.router.url === '/posts/:id';
  }
  isPosts() {
    return this.router.url === '/posts';
  }
  ngOnInit(): void {
    this.postings$ = this.postingService.getListings();

    this.data = this.userService.getUserDetails();
    if(this.data){
      this.username = this.data["user"][0]["username"];
      this.avatar = this.data["user"][0]["avatar"];
    }
    
  }

}
