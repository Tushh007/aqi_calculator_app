import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Calculator } from '../models/calculator';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor(private http: HttpClient) {}

  getcalculations() {
    return this.http.get(`${environment.apiUrl}/aqi_calculator/history`);
  }

  postCalculations(calculatorData: any) {
    console.log(calculatorData);
    return this.http.post(
      `${environment.apiUrl}/aqi_calculator/history`,
      calculatorData
    );
  }
}
