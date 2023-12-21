import { Component, Input, OnInit } from '@angular/core';
import { WidgetsService } from 'src/app/services/widgets.service';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {

  @Input() type: string = ''; //total || clientsOfVisitors

  label: string = '';
  total: number = 0;
  result: number = 0
  infoTooltip: string = ''

  constructor(
    private widgetsService: WidgetsService
  ) { }

  ngOnInit(): void {
    this.setComponent()
  }

  setComponent() {
    if (this.type == 'total') {
      this.widgetsService.totalClients().subscribe((value) => {
        this.label = 'To The Moment'
        this.total = value
        this.infoTooltip = 'Number of Clients Who Filled Out the Form.'
      })
    }
    if (this.type == 'clientsOfVisitors') {
      this.widgetsService.clientsOutOfVisitors().subscribe((value) => {
        this.label = 'Clients out of Visitors'
        this.total = Number((value * 100).toFixed(2))
        this.infoTooltip = 'Percentage of Clients among Landing Page Visitors.'
      })
    }
  }
}
