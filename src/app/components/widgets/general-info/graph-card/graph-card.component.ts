import { Attribute, Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { WidgetsService } from 'src/app/services/widgets.service';

HC_exporting(Highcharts)

@Component({
  selector: 'app-graph-card',
  templateUrl: './graph-card.component.html',
  styleUrls: ['./graph-card.component.scss']
})
export class GraphCardComponent implements OnInit {

  @Input() type: number = 0; //24 for 24hours || 7 for 7days

  label: string = '';
  total: string = '';
  icon: string = '';
  infoTooltip: string = ''

  Highcharts = Highcharts
  chartOptions: any;
  graphArray: any;
  xLine: any;

  constructor(
    private widgetsService: WidgetsService
  ) { }

  ngOnInit(): void {

    this.setComponent()
    this.triggerUpdate()

  }

  setComponent() {
    if (this.type == 24) {
      this.widgetsService.last24hours().subscribe((value) => {
        // console.log(value)
        this.graphArray = value.graphArray
        this.label = 'Last 24 Hours'
        this.total = value.last24hours
        this.icon = value.last24hours > value.previous24hours ? 'up' : 'down'
        this.xLine = ['24 hours ago', '18 hours ago', '12 hours ago', 'last 6 hours']

        this.infoTooltip = 'New Clients from the Last 24 Hours.'
      })

    }
    else if (this.type == 7) {
      this.widgetsService.last7days().subscribe((value) => {
        this.graphArray = value.graphArray
        this.label = 'Last 7 Days'
        this.total = value.last7days
        this.icon = value.last7days > value.previous7days ? 'up' : 'down'

        const dayNames = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'];
        // Get the current day index (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
        const today = 6 - new Date().getDay(); // Get the current day index (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
        // Order the days backward starting from the current day
        this.xLine = dayNames.slice(today).concat(dayNames.slice(0, today)).reverse();
        this.xLine[6] = 'Today'
        this.xLine[5] = 'Yesterday'

        this.infoTooltip = 'New Clients from the Last Week.'
      })
    }
  }

  triggerUpdate() {
    this.chartOptions = {
      chart: {
        type: 'area',
        backgroundColor: null,
        borderWidth: 0,
        margin: [2, 2, 2, 2],
        hight: 60,
      },
      title: {
        text: null,
        align: 'left'
      },
      subtitle: {
        text: null,
        align: 'left'
      },
      plotOptions: {
        series: {
          pointStart: 0,
        }
      },
      tooltip: {
        split: false,
        outside: true,
        pointFormat: '<b>{point.y}</b><br/>',


      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      xAxis: {
        // labels: {
        //   enabled: false
        // },
        // title: {
        //   text: null
        // },
        // tickWidth: 0,
        // This removes ticks on the x-axis
        lineWidth: 0,
        categories: this.xLine
      },
      yAxis: {
        labels: {
          enabled: false
        },
        title: {
          text: null
        },
        tickWidth: 0, // This removes ticks on the y-axis
      },
      series: [{
        data: this.graphArray
      }],
      colors: [
        '#85e5a6'
      ]
    };
  }
}
