import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/authentication/services/user.service';
import { User } from 'src/app/authentication/model/user';
import { Observable, Subscription } from 'rxjs';
import { Posting } from 'src/app/posts/model/posting';
import { PostingService } from 'src/app/posts/services/posting.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  myDate = new Date();
  id:string;
  user:User;
  userSub$: Subscription;

  postings$: Observable<Posting[]>
  
  // Weatehr Data
  WeatherData:any;

    public constructor(private http: HttpClient,private route: ActivatedRoute,private router: Router, public userService:UserService,private postingService:PostingService) {
      
    }
    data;
    avatar;
    username;
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
    // this.loadScript('../../../assets/js/circle-progress.min.js');
    // this.loadScript('../../../assets/js/jquery.barfiller.js');
    // this.loadScript('../../../assets/js/jquery.slicknav.js');
    // this.loadScript('../../../assets/js/owl.carousel.min.js');
    this.loadScript('../../../assets/js/main.js');

    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.getWeatherData();

    if(this.userService.loggedIn()){
      this.data = this.userService.getUserDetails();
      this.username = this.data["user"][0]["username"];
      this.avatar = this.data["user"][0]["avatar"];
    }
    
   

    this.postings$ = this.postingService.getListings();

 }

 getWeatherData(){
  fetch('https://api.openweathermap.org/data/2.5/weather?q=English+Bazar&appid=16b23548cd8286f1fa5f97b446e51ce0')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
 }

 setWeatherData(data){
  this.WeatherData = data;
  this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
  let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
 }
  

 

}
