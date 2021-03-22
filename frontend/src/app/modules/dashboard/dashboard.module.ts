import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { A11yModule } from '@angular/cdk/a11y';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AlertsAndErrorsModule } from '../alerts-and-errors/alerts-and-errors.module';
import { MatSelectModule } from '@angular/material/select';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { AqiDataComponent } from './components/aqi-data/aqi-data.component';
import { CalculatorFormComponent } from './components/calculator-form/calculator-form.component';

@NgModule({
  declarations: [
    HomeComponent,
    CalculatorComponent,
    AqiDataComponent,
    CalculatorFormComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    A11yModule,
    MatCardModule,
    FlexLayoutModule,
    MatPaginatorModule,
    AlertsAndErrorsModule,
    MatSelectModule,
    RouterModule,
  ],
  exports: [HomeComponent, CalculatorComponent, AqiDataComponent],
  entryComponents: [],
})
export class DashboardModule {}
