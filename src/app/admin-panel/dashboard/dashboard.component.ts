import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/authentication/services/user.service';
import { PostingService } from 'src/app/posts/services/posting.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  today: number = Date.now();
  WeatherData:any;
  data;username;avatar;
  constructor(public userService:UserService,private postingService:PostingService) {setInterval(() => {this.today = Date.now()}, 10); }
      

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  userList;postList;
  
  ngOnInit() { 
    this.loadScript('../../../assets/admin/vendor/jquery/jquery.min.js');
      this.loadScript('../../../assets/admin/vendor/popper.js/umd/popper.min.js');
      this.loadScript('../../../assets/admin/vendor/bootstrap/js/bootstrap.min.js');
      this.loadScript('../../../assets/admin/vendor/jquery.cookie/jquery.cookie.js');
      this.loadScript('../../../assets/admin/vendor/chart.js/Chart.min.js');
      this.loadScript('../../../assets/admin/vendor/jquery-validation/jquery.validate.min.js');
      this.loadScript('../../../assets/admin/js/charts-home.js');
      this.loadScript('../../../assets/admin/js/front.js');
      
      this.WeatherData = {
        main : {},
        isDay: true
      };
      this.getWeatherData(); 
      
      if(this.userService.loggedIn()){
        this.data = this.userService.getUserDetails();
        this.username = this.data["user"][0]["username"];
        this.avatar = this.data["user"][0]["avatar"];

        this.userService.getUsers().subscribe((results)=>{
          this.userList = results.length
        })
        this.postingService.getListings().subscribe((results)=>{
          this.postList = results.length
        })
      }

      
      
  }
  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=English+Bazar&appid=ff1bc4683fc7325e9c57e586c20cc03e')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})

    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
    // this.setWeatherData(data);
  }

  setWeatherData(data){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }

}
