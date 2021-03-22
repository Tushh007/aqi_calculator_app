import { OnDestroy } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/app/shared/models';
import { Pollutants } from 'src/app/shared/models/pollutants';
import {
  AuthenticationService,
  CalculatorService,
} from 'src/app/shared/services';
import { AlertService } from 'src/app/shared/services/alert.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.css'],
})
export class CalculatorFormComponent implements OnInit, OnDestroy {
  @Input() value: string;
  calculatorForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  matcher = new MyErrorStateMatcher();

  aqiData = {
    pollutant: '',
    aqi: 0,
    concentration: 0,
    aqi_category: '',
    sensitive_groups: '',
    health_effects_statements: '',
    cautionary_statements: '',
    user: null,
  };
  selectedPollutant: string;
  result = {
    category: '',
    Ilow: 0,
    Ihigh: 0,
    Clow: 0,
    Chigh: 0,
    sensitive_groups: '',
    health_effetcs_statements: '',
    cautionary_statements: '',
  };

  pollutants: Pollutants[] = [
    {
      value: 'PM25',
      viewValue: 'PM2.5 (ug/m3) - Particulate < 2.5 microns (24hr avg)',
    },
    {
      value: 'PM10',
      viewValue: 'PM10  (ug/m3) - Particulate <10 microns (24hr avg)',
    },
    {
      value: 'NO2',
      viewValue: 'NO2 (ppb) - Nitrogen Dioxide (1hr avg)',
    },
    {
      value: 'SO2',
      viewValue: 'SO2 (ppb) - Sulfur Dioxide (1hr avg)',
    },
    {
      value: 'CO',
      viewValue: 'CO (ppm)- Carbon Monoxide (8hr avg)',
    },
    { value: 'O38', viewValue: 'O3 - Ozone (8hr avg)' },
    { value: 'O31', viewValue: 'O3 - Ozone (1hr avg)' },
  ];

  currentUser: User;
  private authSubscription: Subscription;

  PM25 = [
    {
      category: 'Good',
      Ilow: 0,
      Ihigh: 50,
      Clow: 0,
      Chigh: 12.0,
      sensitive_groups:
        'People with respiratory or heart disease, the elderly and children are the groups most at risk.',
      health_effetcs_statements: 'None',
      cautionary_statements: 'None',
    },
    {
      category: 'Moderate',
      Ilow: 51,
      Ihigh: 100,
      Clow: 12.1,
      Chigh: 35.4,
      sensitive_groups:
        'People with respiratory or heart disease, the elderly and children are the groups most at risk.',
      health_effetcs_statements:
        'Unusually sensitive people should consider reducing prolonged or heavy exertion.',
      cautionary_statements:
        'Unusually sensitive people should consider reducing prolonged or heavy exertion.',
    },
    {
      category: 'Unhealthy for sensitive groups',
      Ilow: 101,
      Ihigh: 150,
      Clow: 35.5,
      Chigh: 55.4,
      sensitive_groups:
        'People with respiratory or heart disease, the elderly and children are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Increasing likelihood of respiratory symptoms in sensitive individuals, aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly.',
      cautionary_statements:
        'People with respiratory or heart disease, the elderly and children should limit prolonged exertion.',
    },
    {
      category: 'Unhealthy',
      Ilow: 151,
      Ihigh: 200,
      Clow: 55.5,
      Chigh: 150.4,
      sensitive_groups:
        'People with respiratory or heart disease, the elderly and children are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Increased aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; increased respiratory effects in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'People with respiratory or heart disease, the elderly and children should avoid prolonged exertion; everyone else should limit prolonged exertion.',
    },
    {
      category: 'Very unhealthy',
      Ilow: 201,
      Ihigh: 300,
      Clow: 150.5,
      Chigh: 250.4,
      sensitive_groups:
        'People with respiratory or heart disease, the elderly and children are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Significant aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; significant increase in respiratory effects in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'People with respiratory or heart disease, the elderly and children should avoid any outdoor activity; everyone else should avoid prolonged exertion.',
    },
    {
      category: 'Hazardous',
      Ilow: 301,
      Ihigh: 500,
      Clow: 250.5,
      Chigh: 500.4,
      sensitive_groups:
        'People with respiratory or heart disease, the elderly and children are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Serious aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; serious risk of respiratory effects in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'Everyone should avoid any outdoor exertion; people with respiratory or heart disease, the elderly and children should remain indoors.',
    },
  ];

  PM10 = [
    {
      category: 'Good',
      Ilow: 0,
      Ihigh: 50,
      Clow: 0,
      Chigh: 54,
      sensitive_groups:
        'People with respiratory disease are the group most at risk.',
      health_effetcs_statements: 'None',
      cautionary_statements: 'None',
    },
    {
      category: 'Moderate',
      Ilow: 51,
      Ihigh: 100,
      Clow: 55,
      Chigh: 154,
      sensitive_groups:
        'People with respiratory disease are the group most at risk.',
      health_effetcs_statements:
        'Unusually sensitive people should consider reducing prolonged or heavy exertion.',
      cautionary_statements:
        'Unusually sensitive people should consider reducing prolonged or heavy exertion.',
    },
    {
      category: 'Unhealthy for sensitive groups',
      Ilow: 101,
      Ihigh: 150,
      Clow: 155,
      Chigh: 254,
      sensitive_groups:
        'People with respiratory disease are the group most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Increasing likelihood of respiratory symptomsand aggravationof lung disease, such as asthma.',
      cautionary_statements:
        'People with respiratorydisease, such as asthma, shouldlimit outdoor exertion.',
    },
    {
      category: 'Unhealthy',
      Ilow: 151,
      Ihigh: 200,
      Clow: 255,
      Chigh: 354,
      sensitive_groups:
        'People with respiratory disease are the group most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Increased respiratory symptoms and aggravation of lung disease, such as asthma; possible respiratory effects in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'People with respiratory disease are the group most at risk. Increased respiratory symptoms and aggravation of lung disease, such as asthma; possible respiratory effects in general population.',
    },
    {
      category: 'Very unhealthy',
      Ilow: 201,
      Ihigh: 300,
      Clow: 355,
      Chigh: 424,
      sensitive_groups:
        'People with respiratory disease are the group most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Significant increase in respiratory symptoms and aggravation of lung disease, such as asthma; increasing likelihood of respiratory effects in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'People with respiratory disease, such as asthma, should avoid any outdoor activity; everyone else, especially the elderly and children, should limit outdoor exertion.',
    },
    {
      category: 'Hazardous',
      Ilow: 301,
      Ihigh: 500,
      Clow: 425,
      Chigh: 604,
      sensitive_groups:
        'People with respiratory disease are the group most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Serious risk of respiratory symptoms and aggravation of lung disease, such as asthma; respiratory effects likely in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'Everyone should avoid any outdoor exertion; people with respiratory disease, such as asthma, should remain indoors.',
    },
  ];

  NO2 = [
    {
      category: 'Good',
      Ilow: 0,
      Ihigh: 50,
      Clow: 0,
      Chigh: 53,
      sensitive_groups:
        'People with asthma or other respiratory diseases, the elderly, and children are the groups most at risk.',
      health_effetcs_statements: 'None',
      cautionary_statements: 'None',
    },
    {
      category: 'Moderate',
      Ilow: 51,
      Ihigh: 100,
      Clow: 54,
      Chigh: 100,
      sensitive_groups:
        'People with asthma or other respiratory diseases, the elderly, and children are the groups most at risk.',
      health_effetcs_statements:
        'Unusually sensitive individuals may experience respiratory symptoms.',
      cautionary_statements:
        'Unusually sensitive people should consider reducing prolonged or heavy outdoor exertion.',
    },
    {
      category: 'Unhealthy for sensitive groups',
      Ilow: 101,
      Ihigh: 150,
      Clow: 101,
      Chigh: 360,
      sensitive_groups:
        'People with asthma or other respiratory diseases, the elderly, and children are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Increasing likelihood of respiratory symptoms and breathing discomfort in active children, the elderly, and people with lung disease, such as asthma.',
      cautionary_statements:
        'Active children, the elderly, and people with lung disease, such as asthma, should reduce prolonged or heavy outdoor exertion.',
    },
    {
      category: 'Unhealthy',
      Ilow: 151,
      Ihigh: 200,
      Clow: 361,
      Chigh: 649,
      sensitive_groups:
        'People with asthma or other respiratory diseases, the elderly, and children are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Greater likelihood of respiratory symptoms in active children, the elderly, and people with lung disease, such as asthma; possible respiratory effects in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'Active children, the elderly, and people with lung disease, such as asthma, should avoid prolonged or heavy outdoor exertion; everyone else, expecially children, should reduce prolonged or heavy outdoor exertion.',
    },
    {
      category: 'Very unhealthy',
      Ilow: 201,
      Ihigh: 300,
      Clow: 650,
      Chigh: 1249,
      sensitive_groups:
        'People with asthma or other respiratory diseases, the elderly, and children are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Increasingly severe symptoms and impaired breathing likely in active children, the elderly, and people with lung disease, such as asthma; increasing likelihood of respiratory effects in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'Active children, the elderly, and people with lung disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should avoid prolonged or heavy outdoor exertion.',
    },
    {
      category: 'Hazardous',
      Ilow: 301,
      Ihigh: 500,
      Clow: 1250,
      Chigh: 2049,
      sensitive_groups:
        'People with asthma or other respiratory diseases, the elderly, and children are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'evere respiratory effects and impaired breathing likely in active children, the elderly, and people with lung disease, such as asthma; increasingly severe respiratory effects likely in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'Children, the elderly, and people with lung disease, such as asthma, should remain indoors; everyone else, especially children, should avoid outdoor exertion.',
    },
  ];
  SO2 = [
    {
      category: 'Good',
      Ilow: 0,
      Ihigh: 50,
      Clow: 0,
      Chigh: 35,
      sensitive_groups: 'People with heart disease are the group most at risk.',
      health_effetcs_statements: 'None',
      cautionary_statements: 'None',
    },
    {
      category: 'Moderate',
      Ilow: 51,
      Ihigh: 100,
      Clow: 36,
      Chigh: 75,
      sensitive_groups: 'People with heart disease are the group most at risk.',
      health_effetcs_statements: 'None',
      cautionary_statements: 'None',
    },
    {
      category: 'Unhealthy for sensitive groups',
      Ilow: 101,
      Ihigh: 150,
      Clow: 76,
      Chigh: 185,
      sensitive_groups: 'People with heart disease are the group most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Increasing likelihood of reduced exercise tolerance due to increased cardiovascular symptoms, such as chest pain, in people with cardiovascular disease.',
      cautionary_statements:
        'People with cardiovascular disease, such as angina, should limit heavy exertion and avoid sources of CO, such as heavy traffic.',
    },
    {
      category: 'Unhealthy',
      Ilow: 151,
      Ihigh: 200,
      Clow: 186,
      Chigh: 304,
      sensitive_groups:
        'People with asthma or other respiratory diseases, the elderly, and children are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Greater likelihood of respiratory symptoms in active children, the elderly, and people with lung disease, such as asthma; possible respiratory effects in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'Active children, the elderly, and people with lung disease, such as asthma, should avoid prolonged or heavy outdoor exertion; everyone else, expecially children, should reduce prolonged or heavy outdoor exertion.',
    },
    {
      category: 'Very unhealthy',
      Ilow: 201,
      Ihigh: 300,
      Clow: 305,
      Chigh: 604,
      sensitive_groups: 'People with asthma are the group most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Significant increase in respiratory symptoms, such as wheezing and shortness of breath, in people with asthma; aggravation of heart or lung disease.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'Children, asthmatics, and people with heart or lung disease should avoid outdoor exertion; everyone else should limit outdoor exertion.',
    },
    {
      category: 'Hazardous',
      Ilow: 301,
      Ihigh: 500,
      Clow: 605,
      Chigh: 1004,
      sensitive_groups: 'People with asthma are the group most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Severe respiratory symptoms, such as wheezing and shortness of breath, in people with asthma; increased aggravation of heart or lung disease; possible respiratory effects in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'Children, asthmatics, and people with heart or lung disease should remain indoors; everyone else should avoid outdoor exertion.',
    },
  ];

  CO = [
    {
      category: 'Good',
      Ilow: 0,
      Ihigh: 50,
      Clow: 0,
      Chigh: 4.4,
      sensitive_groups: 'People with heart disease are the group most at risk.',
      health_effetcs_statements: 'None',
      cautionary_statements: 'None',
    },
    {
      category: 'Moderate',
      Ilow: 51,
      Ihigh: 100,
      Clow: 4.5,
      Chigh: 9.4,
      sensitive_groups: 'People with heart disease are the group most at risk.',
      health_effetcs_statements: 'None',
      cautionary_statements: 'None',
    },
    {
      category: 'Unhealthy for sensitive groups',
      Ilow: 101,
      Ihigh: 150,
      Clow: 9.5,
      Chigh: 12.4,
      sensitive_groups: 'People with asthma are the group most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Increasing likelihood of respiratory symptoms, such as chest tightness and breathing discomfort, in people with asthma.',
      cautionary_statements:
        'People with asthma should consider limiting outdoor exertion.',
    },
    {
      category: 'Unhealthy',
      Ilow: 151,
      Ihigh: 200,
      Clow: 12.5,
      Chigh: 15.4,
      sensitive_groups:
        'People with asthma or other respiratory diseases, the elderly, and children are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Greater likelihood of respiratory symptoms in active children, the elderly, and people with lung disease, such as asthma; possible respiratory effects in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'Active children, the elderly, and people with lung disease, such as asthma, should avoid prolonged or heavy outdoor exertion; everyone else, expecially children, should reduce prolonged or heavy outdoor exertion.',
    },
    {
      category: 'Very unhealthy',
      Ilow: 201,
      Ihigh: 300,
      Clow: 15.5,
      Chigh: 30.4,
      sensitive_groups: 'People with heart disease are the group most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Significant aggravation of cardiovascular symptoms, such as chest pain, in people with cardiovascular disease.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'People with cardiovascular disease, such as angina, should avoid exertion and sources of CO, such as heavy traffic.',
    },
    {
      category: 'Hazardous',
      Ilow: 301,
      Ihigh: 500,
      Clow: 30.5,
      Chigh: 50.4,
      sensitive_groups: 'People with heart disease are the group most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Serious aggravation of cardiovascular symptoms, such as chest pain, in people with cardiovascular disease; impairment of strenuous activities in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'People with cardiovascular disease, such as angina, should avoid exertion and sources of CO, such as heavy traffic; everyone else should limit heavy exertion.',
    },
  ];

  O38 = [
    {
      category: 'Good',
      Ilow: 0,
      Ihigh: 50,
      Clow: 0,
      Chigh: 54,
      sensitive_groups:
        'Children and people with asthma are the groups most at risk.',
      health_effetcs_statements: 'None',
      cautionary_statements: 'None',
    },
    {
      category: 'Moderate',
      Ilow: 51,
      Ihigh: 100,
      Clow: 55,
      Chigh: 70,
      sensitive_groups:
        'Children and people with asthma are the groups most at risk.',
      health_effetcs_statements:
        'Unusually sensitive individuals may experience respiratory symptoms.',
      cautionary_statements:
        'Unusually sensitive people should consider limiting prolonged outdoor exertion.',
    },
    {
      category: 'Unhealthy for sensitive groups',
      Ilow: 101,
      Ihigh: 150,
      Clow: 71,
      Chigh: 85,
      sensitive_groups:
        'Children and people with asthma are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Increasing likelihood of respiratory symptoms and breathing discomfort in active children and adults and people with respiratory disease, such as asthma.',
      cautionary_statements:
        'Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.',
    },
    {
      category: 'Unhealthy',
      Ilow: 151,
      Ihigh: 200,
      Clow: 86,
      Chigh: 105,
      sensitive_groups:
        'Children and people with asthma are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Greater likelihood of respiratory symptoms and breathing difficulty in active children and adults and people with respiratory disease, such as asthma; possible respiratory effects in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion.',
    },
    {
      category: 'Very unhealthy',
      Ilow: 201,
      Ihigh: 300,
      Clow: 106,
      Chigh: 200,
      sensitive_groups:
        'Children and people with asthma are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Increasingly severe symptoms and impaired breathing likely in active children and adults and people with respiratory disease, such as asthma; increasing likelihood of respiratory effects in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.',
    },
  ];

  O31 = [
    {
      category: 'Unhealthy for sensitive groups',
      Ilow: 101,
      Ihigh: 150,
      Clow: 125,
      Chigh: 164,
      sensitive_groups:
        'Children and people with asthma are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Increasing likelihood of respiratory symptoms and breathing discomfort in active children and adults and people with respiratory disease, such as asthma.',
      cautionary_statements:
        'Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.',
    },
    {
      category: 'Unhealthy',
      Ilow: 151,
      Ihigh: 200,
      Clow: 165,
      Chigh: 204,
      sensitive_groups:
        'Children and people with asthma are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Greater likelihood of respiratory symptoms and breathing difficulty in active children and adults and people with respiratory disease, such as asthma; possible respiratory effects in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'Active children and adults, and people with respiratory disease, such as asthma, should avoid heavy outdoor exertion; everyone else, especially children, should limit heavy outdoor exertion.',
    },
    {
      category: 'Very unhealthy',
      Ilow: 201,
      Ihigh: 300,
      Clow: 205,
      Chigh: 404,
      sensitive_groups:
        'Children and people with asthma are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Increasingly severe symptoms and impaired breathing likely in active children and adults and people with respiratory disease, such as asthma; increasing likelihood of respiratory effects in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.',
    },
    {
      category: 'Hazardous',
      Ilow: 301,
      Ihigh: 500,
      Clow: 405,
      Chigh: 604,
      sensitive_groups:
        'Children and people with asthma are the groups most at risk.',
      health_effetcs_statements:
        // tslint:disable-next-line:max-line-length
        'Severe respiratory effects and impaired breathing likely in active children and adults and people with respiratory disease, such as asthma; increasingly severe respiratory effects likely in general population.',
      cautionary_statements:
        // tslint:disable-next-line:max-line-length
        'Everyone should avoid all outdoor exertion.',
    },
  ];

  AQIBreakPoint = {
    PM25: this.PM25,
    PM10: this.PM10,
    NO2: this.NO2,
    SO2: this.SO2,
    CO: this.CO,
    O38: this.O38,
    O31: this.O31,
  };

  calculateConcentration(Ip, Ilow, Ihigh, Clow, Chigh): number {
    return ((Ip - Ilow) / (Ihigh - Ilow)) * (Chigh - Clow) + Clow;
  }

  calculateAQI(Cp, Ilow, Ihigh, Clow, Chigh): number {
    return ((Ihigh - Ilow) / (Chigh - Clow)) * (Cp - Clow) + Ilow;
  }

  calculateAQIMetrics(metrics) {
    if (metrics.aqi) {
      this.result = this.AQIBreakPoint[metrics.pollutant].find(
        (item) =>
          item.Ilow <= Number(metrics.aqi) && Number(metrics.aqi) <= item.Ihigh
      );

      this.aqiData.aqi = metrics.aqi;
      this.aqiData.aqi_category = this.result.category;
      this.aqiData.sensitive_groups = this.result.sensitive_groups;
      this.aqiData.cautionary_statements = this.result.cautionary_statements;
      this.aqiData.health_effects_statements = this.result.health_effetcs_statements;

      // tslint:disable-next-line:max-line-length
      this.aqiData.concentration = this.calculateConcentration(
        metrics.aqi,
        this.result.Ilow,
        this.result.Ihigh,
        this.result.Clow,
        this.result.Chigh
      );
    } else if (metrics.concentration) {
      this.result = this.AQIBreakPoint[metrics.pollutant].find(
        (item) =>
          item.Clow <= Number(metrics.concentration) &&
          Number(metrics.concentration) <= item.Chigh
      );
      this.aqiData.concentration = metrics.concentration;
      this.aqiData.aqi_category = this.result.category;
      this.aqiData.sensitive_groups = this.result.sensitive_groups;
      this.aqiData.cautionary_statements = this.result.cautionary_statements;
      this.aqiData.health_effects_statements = this.result.health_effetcs_statements;

      // tslint:disable-next-line:max-line-length
      this.aqiData.aqi = this.calculateAQI(
        metrics.concentration,
        this.result.Ilow,
        this.result.Ihigh,
        this.result.Clow,
        this.result.Chigh
      );
    } else {
      console.log('no more metrics');
    }
    this.aqiData.user = this.currentUser.id;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private calculatorService: CalculatorService,
    private alertService: AlertService
  ) {
    this.authSubscription = this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  reset() {
    this.aqiData = {
      pollutant: '',
      aqi: 0,
      concentration: 0,
      aqi_category: '',
      sensitive_groups: '',
      health_effects_statements: '',
      cautionary_statements: '',
      user: null,
    };
  }

  initializeForm() {
    this.calculatorForm = this.formBuilder.group({
      pollutant: ['', Validators.required],
      concentration: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/),
        ],
      ],
      aqi: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/),
        ],
      ],
    });

    this.setFormField(this.value);
  }

  setFormField(type: string) {
    if (type === 'aqi') {
      this.calculatorForm.get('concentration').disable();
    } else {
      this.calculatorForm.get('aqi').disable();
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.calculatorForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.calculatorForm.invalid) {
      return;
    }

    this.calculateAQIMetrics(this.calculatorForm.value);

    this.loading = true;

    this.calculatorService
      .postCalculations(this.aqiData)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Calcuations done!', true);
        },
        (error) => {
          this.alertService.error(
            error + ': Invalid details entered. Try Again!'
          );
          this.error = error;
          this.loading = false;
        }
      );
  }
}
