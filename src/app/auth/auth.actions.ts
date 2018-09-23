import { Action } from '@ngrx/store';
export const SET_AUTHENTICATED = '[Auth] Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] UnAuthenticated';

export class SetAuthenticated implements Action {
    readonly type = SET_AUTHENTICATED;
}

export class SetUnAuthenticated implements Action {
    readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnAuthenticated;