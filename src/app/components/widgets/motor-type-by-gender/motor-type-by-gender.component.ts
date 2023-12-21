import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'; // Import the highcharts-more module
import { LandingFormTemplateService } from 'src/app/services/landing-form-template.service';
import { WidgetsService } from 'src/app/services/widgets.service';

// Initialize the highcharts-more module
HC_more(Highcharts);


@Component({
    selector: 'app-motor-type-by-gender',
    templateUrl: './motor-type-by-gender.component.html',
    styleUrls: ['./motor-type-by-gender.component.scss']
})
export class MotorTypeByGenderComponent implements OnInit {

    Highcharts = Highcharts
    chartOptions: any;
    motorTypes = []
    result: any
    constructor(
        private landingFormTemplateService: LandingFormTemplateService,
        private widgetsService: WidgetsService,
    ) { }


    ngOnInit() {
        this.landingFormTemplateService.getData().subscribe(source => {
            this.motorTypes = source.motorTypes.map((motorType: { title: any; }) => motorType.title)

            this.triggerUpdate()
        });

        this.widgetsService.motorTypeByGender_data().subscribe(source => {
            this.result = source;
            this.triggerUpdate()
        });

        // Subscribe to local storage updates
        this.widgetsService.onLocalStorageUpdate().subscribe(() => {
            // Update the result property when local storage changes
            this.widgetsService.motorTypeByGender_data().subscribe(source => {
                this.result = source;
                this.triggerUpdate()
            });
        });

        this.hardCodedChartTemplate()

    }

    triggerUpdate() {

        let maxSum = 0;
        if (this.result)
            if (this.result.length > 0) {
                const maxLength = Math.max(...this.result.map((category: { data: string | any[]; }) => category.data.length));

                for (let i = 0; i < maxLength; i++) {
                    const sum = this.result.reduce((total: any, category: { data: any[]; }) => total + (category.data[i] || 0), 0);
                    maxSum = Math.max(maxSum, sum);
                }
            }

        this.chartOptions = {
            colors: [
                '#85e5a6',
                '#fffb8c',
                '#4f8963'
            ],
            chart: {
                type: 'column',
                inverted: true,
                polar: true
            },
            title: {
                text: 'Motor type by gender',
                align: 'left'
            },
            subtitle: {
                text: '',
                align: 'left'
            },
            tooltip: {
                outside: true
            },
            pane: {
                size: '85%',
                innerSize: '20%',
                endAngle: 270
            },
            xAxis: {
                tickInterval: 1,
                labels: {
                    align: 'right',
                    useHTML: true,
                    allowOverlap: true,
                    step: 1,
                    y: 3,
                    style: {
                        fontSize: '13px'
                    }
                },
                lineWidth: 0,
                gridLineWidth: 0,
                categories: this.motorTypes
            },
            yAxis: {
                lineWidth: 0,
                tickInterval: Math.round(maxSum / 2),
                reversedStacks: false,
                endOnTick: true,
                showLastLabel: true,
                gridLineWidth: 0
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    borderWidth: 0,
                    pointPadding: 0,
                    groupPadding: 0.15,
                    borderRadius: '50%'
                }
            },
            series: this.result
        }

    }

    hardCodedChartTemplate(){
        this.chartOptions = {
            colors: [],
            chart: {
                type: 'column',
                inverted: true,
                polar: true
            },
            title: {
                text: '',
                align: 'left'
            },
            subtitle: {
                text: '',
                align: 'left'
            },
            tooltip: {
                outside: true
            },
            pane: {
                size: '85%',
                innerSize: '20%',
                endAngle: 270
            },
            xAxis: {
                tickInterval: 1,
                labels: {
                    align: 'right',
                    useHTML: true,
                    allowOverlap: true,
                    step: 1,
                    y: 3,
                    style: {
                        fontSize: '13px'
                    }
                },
                lineWidth: 0,
                gridLineWidth: 0,
                categories: []
            },
            yAxis: {
                lineWidth: 0,
                tickInterval: 25,
                reversedStacks: false,
                endOnTick: true,
                showLastLabel: true,
                gridLineWidth: 0
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    borderWidth: 0,
                    pointPadding: 0,
                    groupPadding: 0.15,
                    borderRadius: '50%'
                }
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
