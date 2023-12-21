import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  private dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.dataUrl);
  }

  // getClientsCounter_KEY(): string {
  //   console.log('here1')
  //   let data: any;
  //   this.getData().subscribe((value: any) => {
  //     data = value;
  //   });
  //   console.log(data.ClientsCounter_KEY)
  //   return data.ClientsCounter_KEY;
  // }

  // getLandingPageCounter_KEY(): string {
  //   console.log('here2')

  //   let data: any;
  //   this.getData().subscribe((value: any) => {
  //     data = value;
  //   });
  //   console.log(data.landingPageCounter_KEY)
  //   return data.landingPageCounter_KEY;
  // }

  // getClientsCounter_KEY(): Observable<string> {
  //   return this.getData().pipe(
  //     map((value: any) => value.clientsCounter_KEY)
  //   );
  // }

  // getLandingPageCounter_KEY(): Observable<string> {
  //   return this.getData().pipe(
  //     map((value: any) => value.landingPageCounter_KEY)
  //   );
  // }

}
