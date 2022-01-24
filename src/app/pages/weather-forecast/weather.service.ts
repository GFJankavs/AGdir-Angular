import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import WeatherAPI from "../../../interfaces";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {
  }

  getWeatherForecast(lat: string, lon: string): Observable<WeatherAPI> {
    const href = 'https://8l526ngysb.execute-api.eu-west-1.amazonaws.com/';
    const requestUrl = `${href}?lat=${lat}&lon=${lon}`;
    return this.http.get<WeatherAPI>(requestUrl);
  }
}
