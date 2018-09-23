import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { AuthService } from './../auth.service';
import { UIService } from '../../shared/ui.service';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromApp.State>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromApp.getIsLoading);
    /*this.loadingSub = this.uiService.loadingStateChanged.subscribe(loading => {
      this.isLoading = loading;
    });*/
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
  /*
  ngOnDestroy() {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }*/
}
