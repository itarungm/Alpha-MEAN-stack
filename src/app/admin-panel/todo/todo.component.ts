import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor() { }

  users=[];
  count =0;
  ck=0;
  task;
  table:boolean=false;


  addtodo(uname){
    this.table=true;
  this.done=false;
    
  // uname.value.split(' ').join('');

  uname.value.replace(/ /g, "");  

    if(uname.value.length>0 && uname!=null && uname!==""){
      this.task=uname.value;
      this.users.push({
        name:uname.value
      });
      this.count=this.count+1;

    }else{
      alert("Please Enter Your TODO");
    }    
  }
  done:boolean=false;
  check(chek){
    if(chek.checked){
      this.ck=this.ck+1;
      this.done=true;
    }else{
      this.ck=this.ck-1;
    }
    
  }
  RemoveItem(i,chek){
    if(chek.checked){
      this.ck=this.ck-1;
      this.users.splice(i,1)
      this.count=this.count-1;
      
    }else{
      this.users.splice(i,1)
      this.count=this.count-1;
    }
     

  

  }


  ngOnInit(){
   

  }


  

}
