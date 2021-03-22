import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Calculator, User } from 'src/app/shared/models';
import {
  AuthenticationService,
  CalculatorService,
} from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-aqi-data',
  templateUrl: './aqi-data.component.html',
  styleUrls: ['./aqi-data.component.css'],
})
export class AqiDataComponent implements OnInit, OnDestroy {
  currentUser: User;

  data: any;
  dataSource: any;
  displayedColumns: string[] = [
    'created',
    'pollutant',
    'aqi',
    'concentration',
    'aqi_category',
  ];

  private authSubscription: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private calculatorService: CalculatorService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.authSubscription = this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {
    this.getCalculations();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  tableFeatures() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCalculations() {
    this.calculatorService
      .getcalculations()
      .pipe(first())
      .subscribe(
        (data: Array<Calculator>) => {
          this.data = data.filter((item) => item.user === this.currentUser.id);
          this.dataSource = new MatTableDataSource(this.data);
          this.tableFeatures();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
