import { Injectable } from '@angular/core';
import {AuthTokenService} from '../../auth-token/auth-token.service'
import {
    Response
} from '@angular/http';


import { Observable } from 'rxjs/Observable';


@Injectable()
export class ContactsService {

  constructor(private authService: AuthTokenService) { }
  //private userOptions: any;

  private itemData: any;
  private userOptions: any = {
    userPath: 'contacts'
  }

  // Validate token request
  getContactsByID(id): Observable<Response> {

      let observ = this.authService.get(this.userOptions.userPath +'/'+id+'?access_token='+this.authService.currentAuthData.accessToken);

      observ.subscribe(
          res => {
            this.itemData = res.json();
            console.log(this.itemData);
            // this.authService.userSignedIn$.next(true);
          },
          error => {
              if (error.status === 401) {
                ///  this.signOut();
              }
          });

          return observ;
  }

  getContacts(): Observable<Response> {
    let shopParam = '';
    if (this.authService.currentAuthData.currentShop !== "undefined")
    {
      shopParam = '&shop='+JSON.parse(this.authService.currentAuthData.currentShop).sid.id;
    }

      let observ = this.authService.get(this.userOptions.userPath +'?access_token='+this.authService.currentAuthData.accessToken+shopParam);

      observ.subscribe(
          res => {
            this.itemData = res.json();
            console.log(this.itemData);
            // this.authService.userSignedIn$.next(true);
          },
          error => {
              if (error.status === 401) {
                ///  this.signOut();
              }
          });

          return observ;
  }


  // Validate token request
  addContacts(body): Observable<Response> {
    body.access_token = this.authService.currentAuthData.accessToken;
    body.shop = JSON.parse(this.authService.currentAuthData.currentShop).sid.id;
    body.createdBy = this.authService.currentAuthData.uid;
      let observ = this.authService.post(this.userOptions.userPath, body);

      observ.subscribe(
          res => {
            this.itemData = res.json();
            console.log(this.itemData);
            // this.authService.userSignedIn$.next(true);
          },
          error => {
              if (error.status === 401) {
                ///  this.signOut();
              }
          });

          return observ;
  }

  // Validate token request
  editContacts(body, id): Observable<Response> {
    body.access_token = this.authService.currentAuthData.accessToken;
    body.createdBy = this.authService.currentAuthData.uid;
    let observ = this.authService.put(this.userOptions.userPath+'/'+id, body);
      observ.subscribe(
          res => {
            this.itemData = res.json();
            console.log(this.itemData);
            // this.authService.userSignedIn$.next(true);
          },
          error => {
              if (error.status === 401) {
                ///  this.signOut();
              }
          });

          return observ;
  }

  // Validate token request
 deleteItem(id): Observable<Response> {
  //  body.access_token = this.authService.currentAuthData.accessToken;
    let observ = this.authService.delete(this.userOptions.userPath+'/'+id+'?access_token='+this.authService.currentAuthData.accessToken);
      observ.subscribe(
          res => {

          },
          error => {
              if (error.status === 401) {
                ///  this.signOut();
              }
          });

          return observ;
  }


}
