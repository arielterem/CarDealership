import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LandingPageService } from './landing-page.service';

import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TemplatesService } from './templates.service';

@Injectable({
  providedIn: 'root'
})
export class DataStartingPointService {

  private dataUrl = 'assets/starting-point.json';
  private landingPageCounter = 'landingPageCounter';
  private clientsCounter = 'clientsCounter';

  constructor(
    private http: HttpClient,
    private templatesService: TemplatesService
  ) { }

  async startingPoint() {
    try {
      const data: any[] | undefined = await this.http.get<any[]>(this.dataUrl).toPromise();

      // Check if data is not null or undefined
      if (data) {
        if (localStorage.getItem('formResult_1')) {
          console.log('starting point already initialized')
        }
        else {
          // Get the current counter from localStorage or initialize it to 0
          let counter = parseInt(localStorage.getItem(this.clientsCounter) || '0', 10);

          // Loop through the data and add each item to local storage with a unique key
          data.forEach(item => {
            counter++;
            const key = `formResult_${counter}`;
            localStorage.setItem(key, JSON.stringify(item));
          });

          // Update the counter in localStorage
          localStorage.setItem(this.clientsCounter, counter.toString());

          let landingPageCounter = parseInt(localStorage.getItem(this.landingPageCounter) || '0', 10);
          if (landingPageCounter)
            counter = counter + landingPageCounter
          localStorage.setItem(this.landingPageCounter, counter.toString());

          console.log('Local storage initialized.');
        }

      }
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  }

}