import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GeolocationService} from '@ng-web-apis/geolocation';
import {MatTableDataSource} from "@angular/material/table";
import WeatherJSON, {Weather, WeatherDataType} from "../../../interfaces";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  latitude: string;
  longitude: string;
  updatedAt: string;
  weatherData: WeatherDataType[] = [];
  dataSource: MatTableDataSource<WeatherDataType>
  timestamp: string;
  coordinates: any;
  isLoading: boolean = false;

  weatherForm = new FormGroup({
    longitude: new FormControl('', [
      Validators.required,
      Validators.min(-180),
      Validators.max(180)
    ]),
    latitude: new FormControl('', [
      Validators.required,
      Validators.min(-90),
      Validators.max(90)
    ])
  })

  displayedColumns = ['time', 'air_temperature', 'relative_humidity'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private httpClient: HttpClient,
    private readonly geolocation$: GeolocationService
  ) {}

  getLocation(){
    this.geolocation$.subscribe((pos) => {
      console.log(pos);
      this.longitude = pos.coords.longitude.toString();
      this.latitude = pos.coords.latitude.toString();
    });
  }

  getWeatherForecast(lat: string, lon: string): void {
    this.isLoading = true;
    const href = 'https://8l526ngysb.execute-api.eu-west-1.amazonaws.com/';
    const requestUrl = `${href}?lat=${lat}&lon=${lon}`;

    setTimeout(() => {
      this.httpClient.get<WeatherJSON>(requestUrl).subscribe((res) => {
        this.timestamp = res.properties.meta.updated_at;
        this.coordinates = {
          lat: res.geometry.coordinates[0].toString(),
          lon: res.geometry.coordinates[1].toString(),
        };
        this.weatherData = [];

        res.properties.timeseries.map((weather) => {
          this.weatherData.push({
            time: weather.time,
            air_temperature: weather.data.instant.details.air_temperature.toString(),
            relative_humidity: weather.data.instant.details.relative_humidity.toString()
          })
        })
        this.dataSource = new MatTableDataSource<WeatherDataType>(this.weatherData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.coordinates);
        console.log(this.weatherData);
        this.isLoading = false;
      });
    }, 1000);
  }

  ngOnInit(): void {
    this.getLocation();
    console.log(this.weatherData);
  }

  get longitude(){return this.weatherForm.get('longitude')}
}
