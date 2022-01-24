import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {MatTableDataSource} from "@angular/material/table";
import {Weather, WeatherDataType} from "../../../interfaces";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription, take} from 'rxjs';
import {WeatherService} from "./weather.service";

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  dataSource: MatTableDataSource<WeatherDataType>;
  weatherSubscription: Subscription;
  locationSubscription: Subscription;
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

  constructor(
    private readonly geolocationService: GeolocationService,
    private weatherService: WeatherService
  ) {
    this.dataSource = new MatTableDataSource<WeatherDataType>([]);
  }

  ngOnInit(): void {
    this.getLocation();
  }

  ngOnDestroy(): void {
    this.locationSubscription.unsubscribe();
    this.weatherSubscription.unsubscribe();
  }

  getLocation(): void {
    this.locationSubscription = this.geolocationService.pipe(take(1)).subscribe((pos) => {
      if (pos) {
        console.log(pos);
        this.weatherForm.patchValue({
          longitude: pos.coords.longitude.toString(),
          latitude: pos.coords.latitude.toString()
        })
      }
    });
  }

  getWeatherForecast(): void {
    if (this.weatherForm.value.latitude && this.weatherForm.value.longitude) {
      if (this.weatherForm.get('longitude')?.hasError === undefined) {
        console.log('There is an error');
      }
      this.isLoading = true;
      const lat = this.weatherForm.value.latitude;
      const lon = this.weatherForm.value.longitude;

      setTimeout(() => {
        this.weatherSubscription = this.weatherService.getWeatherForecast(lat, lon).subscribe((res) => {

          const weatherData: WeatherDataType[] = [];

          res.properties.timeseries.map((weather: Weather) => {
            weatherData.push({
              time: weather.time,
              air_temperature: weather.data.instant.details.air_temperature.toString(),
              relative_humidity: weather.data.instant.details.relative_humidity.toString()
            })
          })

          this.dataSource.data = weatherData;
          this.dataSource.sort = this.sort;

          this.isLoading = false;
        });
      }, 1000);
    }
  }
}
