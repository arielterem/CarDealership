// clients.component.ts
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WidgetsService } from 'src/app/services/widgets.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit , AfterViewInit{
  displayedColumns: string[] = ['index', 'fullName', 'email', 'timeStamp'];
  dataSource: MatTableDataSource<PeriodicElement>;

  constructor(private widgetsService: WidgetsService) {
    this.dataSource = new MatTableDataSource<PeriodicElement>([]);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.widgetsService.clientTable().subscribe((value) => {
      this.dataSource.data = value;
      // this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  index: number;
  fullName: string;
  email: string;
  timeStamp: string;
}
