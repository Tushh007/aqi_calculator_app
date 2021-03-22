import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Calculator } from 'src/app/shared/models/calculator';
import { CalculatorService } from 'src/app/shared/services';

@Component({
  selector: 'app-aqi-json',
  templateUrl: './aqi-json.component.html',
  styleUrls: ['./aqi-json.component.css'],
})
export class AqiJsonComponent implements OnInit {
  data: Calculator[];
  constructor(private calculatorService: CalculatorService) {
    this.getCalculations();
  }

  ngOnInit() {}

  getCalculations() {
    this.calculatorService
      .getcalculations()
      .pipe(first())
      .subscribe(
        (data: Array<Calculator>) => {
          this.data = data;
          console.log(this.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
