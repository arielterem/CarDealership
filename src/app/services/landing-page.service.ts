import { Injectable } from '@angular/core';
import { WidgetsService } from './widgets.service';
import { TemplatesService } from './templates.service';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  private landingPageCounter = 'landingPageCounter';
  private clientsCounter = 'clientsCounter';

  constructor(
    private widgetsService: WidgetsService,
    private templatesService: TemplatesService
  ) { }

  saveFormData(formData: any): void {
    // Retrieve the current count from local storage or default to 0
    const count = parseInt(localStorage.getItem(this.clientsCounter) || '0', 10) + 1;

    // Save the new count in local storage
    localStorage.setItem(this.clientsCounter, count.toString());

    // Generate the key for the current form result
    const key = `formResult_${count}`;

    // Save the form data in local storage with the generated key
    localStorage.setItem(key, JSON.stringify(formData));

    this.widgetsService.notifyLocalStorageUpdate();

  }


  getLandingPageCounter(): number {
    const count = localStorage.getItem(this.landingPageCounter);
    return count ? parseInt(count, 10) : 0;
  }

    incrementLandingPageCount(): void {
    const currentCount = this.getLandingPageCounter();
    const newCount = currentCount + 1;
    localStorage.setItem(this.landingPageCounter, newCount.toString());
  }
}
