import { Component, OnInit } from '@angular/core';
import { Posting } from 'src/app/posts/model/posting';
import { PostingService } from 'src/app/posts/services/posting.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/authentication/services/user.service';
import { PostsModule } from 'src/app/posts/posts.module';
declare var jQuery: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  data;avatar;
  postings$: Observable<Posting[]>
  postings:any=[]
  title;
  fetching;

  constructor(private postingService:PostingService,public userService:UserService) { }
   

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
    this.loadScript('../../../assets/js/jquery.magnific-popup.min.js');
    this.loadScript('../../../assets/js/circle-progress.min.js');
    this.loadScript('../../../assets/js/jquery.barfiller.js');
    this.loadScript('../../../assets/js/jquery.slicknav.js');
    this.loadScript('../../../assets/js/owl.carousel.min.js');
    this.loadScript('../../../assets/js/main.js');

    
    
      this.postings$=this.postingService.getListings();
      this.postingService.getListings().subscribe((result)=>{
      //  console.log(result);
       // this.postings=result;
       result.map((res,i)=>{
         if(res["category"]=="Tech"){
           this.postings.push(i)
         }
       })
     })
    
 



    // console.log("This is Postings",this.postings$)
    // this.postings.map((result)=>{
    //   console.log(result.category=="Tech",result)
    // })
    
 }

}
