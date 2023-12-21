import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import variablePie from 'highcharts/modules/variable-pie'; // Import the module
import { WidgetsService } from 'src/app/services/widgets.service';

// Initialize the module
variablePie(Highcharts);


@Component({
  selector: 'app-gender-analysis',
  templateUrl: './gender-analysis.component.html',
  styleUrls: ['./gender-analysis.component.scss']
})
export class GenderAnalysisComponent implements OnInit {

  Highcharts = Highcharts
  chartOptions : any;
  result: any

  constructor(
    private widgetsService: WidgetsService,
  ) { }

  ngOnInit(): void {
    this.widgetsService.genderAnalysis().subscribe(source => {
      this.result = source;
      // console.log('Initial source gender analysis: ', source);
      this.triggerUpdate()
  });

  // Subscribe to local storage updates
  this.widgetsService.onLocalStorageUpdate().subscribe(() => {
      // Update the result property when local storage changes
      this.widgetsService.genderAnalysis().subscribe(source => {
          this.result = source;
          // console.log('Updated source gender analysis: ', source);
          this.triggerUpdate()
      });
  });

    this.triggerUpdate()

  }

  triggerUpdate() {
    this.chartOptions = {
      chart: {
        type: 'variablepie'
      },
      title: {
        text: 'Gender analysis',
        align: 'left'
      },
      credits: {
        enabled: false
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
          '<b>{point.y} total</b>'
      },
      series: [{
        minPointSize: 10,
        innerSize: '20%',
        zMin: 0,
        name: 'countries',
        borderRadius: 5,

        data: this.result,
        colors: [
          '#85e5a6',
          '#fffb8c',
          '#4f8963'
        ]
      }]
    }
  }


}
