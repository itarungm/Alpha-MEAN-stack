import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/authentication/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    userList:any=[];
  constructor(public  userService:UserService) { }
  data;username;avatar;

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  ngOnInit(): void {
    this.loadScript('../../../assets/admin/vendor/jquery/jquery.min.js');
      this.loadScript('../../../assets/admin/vendor/popper.js/umd/popper.min.js');
      this.loadScript('../../../assets/admin/vendor/bootstrap/js/bootstrap.min.js');
      this.loadScript('../../../assets/admin/vendor/jquery.cookie/jquery.cookie.js');
      this.loadScript('../../../assets/admin/vendor/chart.js/Chart.min.js');
      this.loadScript('../../../assets/admin/vendor/jquery-validation/jquery.validate.min.js');
      this.loadScript('../../../assets/admin/js/charts-home.js');
      this.loadScript('../../../assets/admin/js/front.js');

    if(this.userService.loggedIn()){
      this.data = this.userService.getUserDetails();
      this.username = this.data["user"][0]["username"];
      this.avatar = this.data["user"][0]["avatar"];

      this.userList=this.userService.getUsers().subscribe(results=>{
        this.userList=results;
      console.log(this.userList);
  
      });
    }

    
    
  }

}
