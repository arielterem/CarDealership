import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { LandingFormTemplateService } from 'src/app/services/landing-form-template.service';
import { WidgetsService } from 'src/app/services/widgets.service';

@Component({
    selector: 'app-age-by-hobby',
    templateUrl: './age-by-hobby.component.html',
    styleUrls: ['./age-by-hobby.component.scss']
})
export class AgeByHobbyComponent implements OnInit {
    Highcharts = Highcharts;
    chartOptions: any;
    ageRangeArray = ['0-22', '23-50', '51+']
    hobbies = []
    result: any

    constructor(
        private landingFormTemplateService: LandingFormTemplateService,
        private widgetsService: WidgetsService,
    ) { }

    ngOnInit(): void {
        this.landingFormTemplateService.getData().subscribe(source => {
            this.hobbies = source.hobbies.map((hobby: { title: any; }) => hobby.title)

            this.triggerUpdate()
        });


        this.widgetsService.ageByHobby().subscribe(source => {
            this.result = source;
            // console.log('Initial source age by hobby:: ', source);
            this.triggerUpdate()
        });

        // Subscribe to local storage updates
        this.widgetsService.onLocalStorageUpdate().subscribe(() => {
            // Update the result property when local storage changes
            this.widgetsService.ageByHobby().subscribe(source => {
                this.result = source;
                // console.log('Updated source age by hobby: ', source);
                this.triggerUpdate()
            });
        });

        this.hardCodedChartTemplate()
    }

    triggerUpdate() {
        this.chartOptions = {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Age by hobby',
                align: 'left'
            },
            subtitle: {
                text: '',
                align: 'left'
            },
            xAxis: {
                categories: this.hobbies,
                title: {
                    text: null
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'amount',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                },
                gridLineWidth: 0
            },
            tooltip: {
                valueSuffix: ' people'
            },
            plotOptions: {
                bar: {
                    borderRadius: '50%',
                    dataLabels: {
                        enabled: true
                    },
                    groupPadding: 0.1
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: this.result,
            colors: [
                '#85e5a6',
                '#fffb8c',
                '#4f8963'
              ]
        }
    }

    hardCodedChartTemplate(){
        this.chartOptions = {
            chart: {
                type: 'bar'
            },
            title: {
                text: '',
                align: 'left'
            },
            subtitle: {
                text: '',
                align: 'left'
            },
            xAxis: {
                categories: [],
                title: {
                    text: null
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            yAxis: {
                min: 0,
                title: {
                    text: '',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                },
                gridLineWidth: 0
            },
            tooltip: {
                valueSuffix: ''
            },
            plotOptions: {
                bar: {
                    borderRadius: '50%',
                    dataLabels: {
                        enabled: true
                    },
                    groupPadding: 0.1
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: '',
                data: []
            }, {
                name: '',
                data: []
            }, {
                name: '',
                data: []
            }]
        }
    }
}
