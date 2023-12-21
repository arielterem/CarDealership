import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenderAnalysisComponent } from './components/widgets/gender-analysis/gender-analysis.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AgeByHobbyComponent } from './components/widgets/age-by-hobby/age-by-hobby.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { MotorTypeByGenderComponent } from './components/widgets/motor-type-by-gender/motor-type-by-gender.component';
import { HeaderComponent } from './components/environment/header/header.component';
import { DashboardComponent } from './components/environment/dashboard/dashboard.component';
import { FooterComponent } from './components/environment/footer/footer.component';
import { HomeComponent } from './components/environment/home/home.component';
import { SubscribedDialogComponent } from './components/landing-page/subscribed-dialog/subscribed-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GraphCardComponent } from './components/widgets/general-info/graph-card/graph-card.component';
import { InfoCardComponent } from './components/widgets/general-info/info-card/info-card.component';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { ClientsComponent } from './components/widgets/clients/clients.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    GenderAnalysisComponent,
    AgeByHobbyComponent,
    LandingPageComponent,
    MotorTypeByGenderComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    HomeComponent,
    SubscribedDialogComponent,
    GraphCardComponent,
    InfoCardComponent,
    ClientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
