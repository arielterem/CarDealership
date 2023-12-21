import { Component, OnInit } from '@angular/core';
import { DataStartingPointService } from './services/data-starting-point.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private dataStartingPointService: DataStartingPointService
  ) { }

  ngOnInit(): void {
    this.dataStartingPointService.startingPoint()
  }

}
