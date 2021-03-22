import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/helpers';
import { HomeComponent } from './modules/dashboard/components/home/home.component';
import { LoginComponent } from './modules/landing/components/login/login.component';
import { RegisterComponent } from './modules/landing/components/register/register.component';
import { CalculatorComponent } from './modules/dashboard/components/calculator/calculator.component';
import { AqiDataComponent } from './modules/dashboard/components/aqi-data/aqi-data.component';
import { AqiJsonComponent } from './modules/landing/components/aqi-json/aqi-json.component';

const routes: Routes = [
  {
    path: 'aq-index/history',
    component: AqiDataComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'aq-index',
    component: CalculatorComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'json/aq-index.json',
    component: AqiJsonComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
