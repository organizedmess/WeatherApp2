import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, map } from "rxjs";
@Injectable({
    providedIn:'root'
})
export class WeatherService{
    api='a7758335f2654d30b8085504241203';
    constructor(private http: HttpClient){}
    fetchData(lat,long){
        
      console.log(lat,long)
       return this.http.get(`http://api.weatherapi.com/v1/forecast.json?key=${this.api}`,
       {
        params: {
                q: `${lat},${long}`,
                days:5
          }
   })
       
       
    }
    fetchByLocation(location){
      
       return this.http.get(`http://api.weatherapi.com/v1/forecast.json?key=${this.api}`,
       {
        params: {
                q: `${location}`,
                days:5
          }
   })
       
       
    }
  
}

// 53aad811907aa6ff0107fefe84adfa4d