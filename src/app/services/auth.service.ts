import { Injectable } from '@angular/core';
// import {Angular2TokenService} from 'angular2-token';
import {AuthTokenService} from '../auth-token/auth-token.service'
import {Response} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  userSignedIn$: Subject<boolean> = new Subject();

  constructor(private authService: AuthTokenService) {

    if (this.authService.currentAuthData){
      this.authService.validateToken().subscribe(
          res => res.status === 200 || res.status === 304 ? this.userSignedIn$.next(true) : this.userSignedIn$.next(false)
      );
    }

  }

  logOutUser(): any {

    if(this.authService.signOut()){
      this.userSignedIn$.next(false);
      return true;
    }
  /*  return this.authService.signOut().map(
        res => {
          this.userSignedIn$.next(false);
          return res;
        }
    );*/
  }

  registerUser(signUpData:  {email: string, password: string, access_token }): Observable<Response> {
    return this.authService.registerAccount(signUpData).map(
        res => {
          this.userSignedIn$.next(true);
          return res;
        }
    );
  }

  logInUser(signInData: {email: string, password: string, access_token}): Observable<Response> {

    return this.authService.signIn(signInData).map(
        res => {
          this.userSignedIn$.next(true);
          return res;
        }
    );

  }
}
