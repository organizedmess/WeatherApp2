import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  location:any
  weatherData: any;
  forecast:any
  cityForm = new FormGroup({
    city: new FormControl('')
  });


  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getGeoLocation()
   
  }
  getWeather(lat,long): void {
    this.weatherService.fetchData(lat,long).subscribe(data => {
      this.location = data['location']
      this.weatherData = data['current']
      this.forecast = data['forecast']
      console.log(this.forecast)
      
    });
  }
  getGeoLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getWeather(position.coords.latitude,position.coords.longitude)
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }


  search(){
    console.log(this.cityForm.value.city)
    this.weatherService.fetchByLocation(this.cityForm.value.city).subscribe(data=>{
      console.log(data)
      this.location = data['location']
      this.weatherData = data['current']
      this.forecast = data['forecast']
    
    }
      , err=>alert("City Not Found"))
  }
}
