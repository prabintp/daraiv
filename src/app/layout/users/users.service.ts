import { Injectable } from '@angular/core';
import {AuthTokenService} from '../../auth-token/auth-token.service'
import {
    Response
} from '@angular/http';


import { Observable } from 'rxjs/Observable';


@Injectable()
export class UsersService {

  constructor(private authService: AuthTokenService) { }
  //private userOptions: any;

  private userData: any;
  private userOptions: any = {
    userPath: '/users'
  }

  // Validate token request
  getUsers(): Observable<Response> {

      let observ = this.authService.get(this.userOptions.userPath +'?access_token='+this.authService.currentAuthData.accessToken);

      observ.subscribe(
          res => {
            this.userData = res.json();
            console.log(this.userData);
            // this.authService.userSignedIn$.next(true);
          },
          error => {
              if (error.status === 401) {
                ///  this.signOut();
              }
          });

          return observ;
  }

}
