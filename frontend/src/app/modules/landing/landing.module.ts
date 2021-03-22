import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { AqiJsonComponent } from './components/aqi-json/aqi-json.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AqiJsonComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatInputModule],
  exports: [LoginComponent, RegisterComponent, AqiJsonComponent],
})
export class LandingModule {}
