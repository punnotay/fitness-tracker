import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from './../shared/ui.service';
import * as fromApp from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';
import { auth } from 'firebase';

@Injectable()
export class AuthService {

    constructor(private router: Router, private afauth: AngularFireAuth
        , private trainingService: TrainingService
        , private uiService: UIService
        , private store: Store<fromApp.State>) {

    }

    initAuthListener() {
        this.afauth.authState.subscribe(user => {
            if (user) {
                //this.isAuthenticated = true;
                //this.authChange.next(true);
                this.store.dispatch(new Auth.SetAuthenticated());
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscription();
                this.store.dispatch(new Auth.SetUnAuthenticated());
                //this.authChange.next(false);
                this.router.navigate(['/login']);
                //this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afauth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                //this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading);
            })
            .catch(err => {
                //this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading);
                this.uiService.showSnackbar(err.message, null, 3000);
            })
    }

    login(authData: AuthData) {
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading);
        this.afauth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading);
        })
        .catch(err => {
            //this.uiService.loadingStateChanged.next(false);  
            this.store.dispatch(new UI.StopLoading);
            this.uiService.showSnackbar(err.message, null, 3000);
        })
    }

    logout() {
        this.afauth.auth.signOut();
    }
/*
    isAuth() {
        return this.isAuthenticated;
    }*/

}