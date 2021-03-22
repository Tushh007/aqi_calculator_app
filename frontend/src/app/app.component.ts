import { Component, OnInit, OnDestroy } from '@angular/core';
import './shared/content/app.less';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';

import { AuthenticationService } from './shared/services';
import { User } from './shared/models';
import { __values } from 'tslib';
import { MatDialog } from '@angular/material';
import { EditProfileDialogComponent } from './navigation-bar-components/edit-profile-dialog/edit-profile-dialog.component';
import { ChangePasswordDialogComponent } from './navigation-bar-components/change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  currentUser: User;
  authSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog
  ) {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      try {
        this.authSubscription = this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      } catch {
        console.log('auth error!')
      }
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() { }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  editProfile() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
