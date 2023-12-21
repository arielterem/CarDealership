import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LandingFormTemplateService } from 'src/app/services/landing-form-template.service';
import { MatDialog } from '@angular/material/dialog';
import { SubscribedDialogComponent } from './subscribed-dialog/subscribed-dialog.component';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  data: any = {}
  form!: FormGroup;
  currentDate: Date = new Date();
  minDate = new Date('1900-01-01');
  touched: boolean = true;

  constructor(
    private fb: FormBuilder,
    private landingFormTemplateService: LandingFormTemplateService,
    private landingPageService: LandingPageService,
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.landingFormTemplateService.getData().subscribe(source => {
      this.data = source
    });

    this.initializeForm()

    this.landingPageService.incrementLandingPageCount();
  }


  onSubmit() {

    if (this.form.valid) {
      const formDataWithTimestamp = {
        timeStamp: new Date().toISOString(),
        ...this.form.value,
      };

      // Pass the modified form value to saveFormData method
      this.landingPageService.saveFormData(formDataWithTimestamp);

      this.form.reset();

      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.controls[key];
        control.setErrors(null);
      });

      // Set favoriteColor to white
      this.form.get('favoriteColor')?.setValue('#ffffff');

      // this.form.markAsPristine()
      // this.form.markAsUntouched();

      this.dialog.open(SubscribedDialogComponent);

    } else {
      // Handle the case when the form is not valid
    }
  }

  initializeForm() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(2)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      birthdate: ['', [Validators.required, this.dateValidator()]],
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9./\s]+$/), Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(2)]],
      country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(2)]],
      hobbies: ['', Validators.required],
      favoriteColor: ['#ffffff', [Validators.required, Validators.pattern(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)]],
      seats: [[], Validators.required],
      motorType: [[], Validators.required],
    });
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = control.value;

      if (!selectedDate) {
        return null; // Allow empty values
      }

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison

      if (selectedDate > currentDate || selectedDate < this.minDate) {
        return { invalidDate: true, message: 'Invalid birthdate' };
      }

      return null;
    };
  }


}
