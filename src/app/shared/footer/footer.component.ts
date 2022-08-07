import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Posting } from 'src/app/posts/model/posting';
import { PostingService } from 'src/app/posts/services/posting.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  postings$: Observable<Posting[]>
  
  constructor(private postingService:PostingService) { }

  ngOnInit(): void {
    this.postings$ = this.postingService.getListings();

  }

}
