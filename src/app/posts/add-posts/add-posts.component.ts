import { Component, OnInit } from '@angular/core';
import 'quill-emoji/dist/quill-emoji.js'
import { PostingService } from '../services/posting.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { UserService } from 'src/app/authentication/services/user.service';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.scss']
})
export class AddPostsComponent implements OnInit {
  modules = {}
  editorContent:String;
  charCount;
preview: string;
form: FormGroup;
percentDone: any = 0;
listings = [];
defaultCategory = "Post Category";
categories = ['Tech', 'Gaming', 'Entertainment' , 'News' , 'Trending' , 'World']

data;email;
constructor(public postingService: PostingService, public fb: FormBuilder, private router: Router, public userService:UserService) {
  this.data = this.userService.getUserDetails();
  this.email = this.data["user"][0]["email"];
  // Reactive Form
    this.form = this.fb.group({
      title: [''],
      desc: [''],
      author: [''],
      category: ['Other'],
      created_at: Date(),
      avatar: [null],
      token: [this.email]
    })
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
 
}

// Image Upload
uploadFile(event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({
    avatar: file
  });
  this.form.get('avatar').updateValueAndValidity()

  // File Preview
  const reader = new FileReader();
  reader.onload = () => {
    this.preview = reader.result as string;
  }
  reader.readAsDataURL(file)
}

textChanged($event) {
  this.charCount=$event.editor.getLength()-1
}

submitForm() {
  this.postingService.addListing(
    this.form.value.title,
    this.form.value.desc,
    this.form.value.author,
    this.form.value.category,
    this.form.value.created_at,
    this.form.value.avatar,
    this.form.value.token
  ).subscribe((event: HttpEvent<any>) => {
    switch (event.type) {
      case HttpEventType.Sent:
        console.log('Request has been made!');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Response header has been received!');
        break;
      case HttpEventType.UploadProgress:
        this.percentDone = Math.round(event.loaded / event.total * 100);
        console.log(`Uploaded! ${this.percentDone}%`);
        break;
      case HttpEventType.Response:
        console.log('Post successfully Added!', event.body);
        this.percentDone = false;
        this.form.reset();
        this.router.navigate(['/listings'])
    }
  })
}
changeCategory(e) {
  this.form.get('category').setValue(e.target.value, {
     onlySelf: true
  })
}
}
