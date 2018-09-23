import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private route: Router,
        private store: Store<fromApp.State>
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        /*if (this.authService.isAuth()) {
            return true;
        }
        this.route.navigate(['/login']);*/
        return this.store.select(fromApp.getIsAuthenticated).pipe(take(1));
    }

    canLoad(router: Route) {
        /*
        if (this.authService.isAuth()) {
            return true;
        }
        this.route.navigate(['/login']);*/
        return this.store.select(fromApp.getIsAuthenticated).pipe(take(1));
    }
}