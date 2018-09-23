import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  //authSubscription: Subscription;

  constructor(private authService: AuthService, private store: Store<fromApp.State>) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromApp.getIsAuthenticated);
   /* this.authSubscription = this.authService.authChange.subscribe(status => {
      this.isAuth = status
    })*/
  }

  onClose() {
    this.closeSideNav.emit();
  }

  /*ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }*/

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

}
