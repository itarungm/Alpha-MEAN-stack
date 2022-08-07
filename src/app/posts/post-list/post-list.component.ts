import { Component, OnInit } from '@angular/core';
import { Posting } from '../model/posting';
import { PostingService } from '../services/posting.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {


  postings$: Observable<Posting[]>
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  constructor(private postingService:PostingService) { }
  ngOnInit(): void {
    this.loadScript('../../../assets/js/jquery-3.3.1.min.js');
    this.loadScript('../../../assets/js/bootstrap.min.js');
    this.postings$ = this.postingService.getListings();
  }

}
