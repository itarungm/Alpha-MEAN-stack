import { Component, OnInit, OnDestroy} from '@angular/core';
import { PostingService } from '../services/posting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Posting } from '../model/posting';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import 'quill-emoji/dist/quill-emoji.js'
import { UserService } from 'src/app/authentication/services/user.service';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  modules = {};
  id:string;
  posting:Posting;
  listingSub$: Subscription;
  showForm: boolean;
  data;email;
 userRole;
  
  constructor(private postingService:PostingService,private router: Router,
    private route: ActivatedRoute, public userService:UserService) {
        

      this.modules = {
        'emoji-shortname': true,
        'emoji-textarea': true,
        'emoji-toolbar': true,
        'toolbar': [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
    
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
    
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],
    
          ['clean'],                                         // remove formatting button
    
          ['link', 'image', 'video'],                         // link and image, video
          ['emoji']
    
        ]
      }
    }

    hideBody:boolean=true;

  editListingForm = new FormGroup({

    title: new FormControl("", [Validators.required]),
    desc: new FormControl("", [Validators.required]),
    author: new FormControl("", [Validators.required]),
    // created_at: new FormControl("", [Validators.required])
    // avatar: new FormControl("", [Validators.required]),
  });


  showEdit() {
    this.showForm = !this.showForm;
  }
  editCancel(){
    this.showForm=false;
    this.hideBody=true;

  }
  editListing() {
    this.id = this.route.snapshot.paramMap.get("id");
    
    if (this.editListingForm.valid) {
      this.postingService
        .editListing(this.editListingForm.value, this.id)
        .subscribe(res => {
          this.editListingForm.reset();
          this.router.navigate(["/posts"]);
        });
    }
  }

  onFileChange(ev){
    console.log(ev.target.files)
  }

  removeListing() {
    var check=confirm("Are You Sure, You Want to Delete this Post ?");
    if(check){
      this.id = this.route.snapshot.paramMap.get("id");
      this.postingService.deleteListing(this.id).subscribe(res => {
        console.log(res);
        this.router.navigate(["/my-posts"]);
      });
    }
   
  }
  
  ngOnDestroy():void{
    this.listingSub$.unsubscribe();
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
    this.loadScript('../../../assets/js/jquery.magnific-popup.min.js');
    this.loadScript('../../../assets/js/circle-progress.min.js');
    // this.loadScript('../../../assets/js/jquery.barfiller.js');
    this.loadScript('../../../assets/js/jquery.slicknav.js');
    // this.loadScript('../../../assets/js/owl.carousel.min.js');
    this.loadScript('../../../assets/js/main.js');

    if(this.userService.loggedIn()){
      this.data =this.userService.getUserDetails(); 
        this.email = this.data["user"][0]["email"];
        this.userRole = this.data["user"][0]["userRole"];
    }

    this.id=this.route.snapshot.paramMap.get("id");
    this.listingSub$ = this.postingService.getListing(this.id).subscribe(posting=>{
      this.posting = posting;
    });
 }

}
