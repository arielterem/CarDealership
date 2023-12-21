import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingFormTemplateService {

  private dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.dataUrl);
  }
}
