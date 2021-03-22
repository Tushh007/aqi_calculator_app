import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success';
            this.openSnackBar(message.text, 'close');
            break;
          case 'error':
            message.cssClass = 'alert alert-danger';
            this.openSnackBar(message.text, 'close');
            break;
        }

        this.message = message;
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
