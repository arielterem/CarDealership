import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DashboardComponent } from './components/environment/dashboard/dashboard.component';
import { HomeComponent } from './components/environment/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'landing-page', component: LandingPageComponent},
  {path: 'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
