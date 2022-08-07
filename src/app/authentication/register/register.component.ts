import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('audioOption') audioPlayerRef: ElementRef;

  registerForm:FormGroup
  success:boolean;
  passCheck;

  onAudioPlay(){
    this.audioPlayerRef.nativeElement.play();
  }

  constructor(private userService: UserService,public fb: FormBuilder, private router:Router) {
    // Reactive Form
  this.registerForm = this.fb.group({
    username: [''],
    email: [''],
    author: [''],
    userRole:['author'],
    avatar: [null],
    password: ['']
  })
  }

  ngOnInit() {}
  // Image Upload
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.registerForm.patchValue({
      avatar: file
    });
    this.registerForm.get('avatar').updateValueAndValidity()
  }
  submitForm(pass,pass1) {
    if(pass.value==pass1.value){
      this.userService.register(
        this.registerForm.value.username,
        this.registerForm.value.email,
        this.registerForm.value.avatar,
        this.registerForm.value.userRole,
        this.registerForm.value.password,
        
      ).subscribe(() => {
            this.registerForm.reset();
            pass.value="";
            this.success=true;
            setTimeout(()=>{
              this.success=false;
              this.router.navigate(["/login"]);
            },3000)
      })
      this.passCheck=false;
    }else{
      this.passCheck=true;
    }
    
  }
  // userRegister(pass) {
  //   if (this.registerForm.valid) {
  //     this.userService.register(this.registerForm.value).subscribe(res => {
  //       this.registerForm.reset();
  //       pass.value="";
  //       this.router.navigate(["user/login"]);
  //     });
  //   }
  // }

}
