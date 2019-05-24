import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../user/authentication.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { LoginComponent } from '../user/login/login.component';
declare var $: any;

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  loggedInUser$ = this._authenticationService.user$;

  constructor(
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this._authenticationService.logout();
  }
}
