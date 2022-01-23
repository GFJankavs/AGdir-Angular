import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import WeatherJSON, {Weather} from "../../../interfaces";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import * as moment from "moment/moment";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatTab} from "@angular/material/tabs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() lon: string = '0';
  @Input() lat: string = '0';

  displayedColumns: string[] = ['time', 'temperature', 'humidity'];
  timestamp: string = '';
  dataSource: any;

  isLoadingResults = true;

  constructor(
    private httpClient: HttpClient,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>

  ngOnInit() {
    this.getWeatherForecast(this.lat, this.lon);
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  // announceSortChange(sortState: Sort) {
  //   // This example uses English messages. If your application supports
  //   // multiple language, you would internationalize these strings.
  //   // Furthermore, you can customize the message to add additional
  //   // details about the values being sorted.
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`).then(r => console.log(r));
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared').then(r => console.log(r));
  //   }
  // }

  getWeatherForecast(lat: string, lon: string): void {
    const href = 'https://8l526ngysb.execute-api.eu-west-1.amazonaws.com/';
    const requestUrl = `${href}?lat=${lat}&lon=${lon}`;

    this.httpClient.get<WeatherJSON>(requestUrl).subscribe((res) => {
      console.log(res);
      // this.dataSource = new MatTableDataSource(res.timeseries);
      // this.timestamp = res.properties.meta.updated_at;
      // this.dataSource.sort = this.sort;
    });
  }

  convertTimeStamp(str: string): void{
    this.timestamp = moment.utc(this.timestamp).format('lll');
  }
}
