import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthService } from './../auth.service';
import { UIService } from '../../shared/ui.service';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService
    , private uiService: UIService
    , private store: Store<fromApp.State>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromApp.getIsLoading);
    /*this.loadingSub = this.uiService.loadingStateChanged.subscribe(loading => {
      this.isLoading = loading;
    });*/
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }

/*  ngOnDestroy() {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }*/

}
