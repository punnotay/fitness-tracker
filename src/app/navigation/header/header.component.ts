import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  //authSubScription: Subscription;

  constructor(private store: Store<fromApp.State>, private authService: AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromApp.getIsAuthenticated);
    /*
    this.authSubScription = this.authService.authChange.subscribe(status => {
      this.isAuth = status;
    });*/
  }

  onToggleSideNav() {
    this.sidenavToggle.emit();
  }

  /*ngOnDestroy() {
    this.authSubScription.unsubscribe();
  }*/

  onLogout() {
    this.authService.logout();
  }

}
