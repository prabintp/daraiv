import { Injectable } from '@angular/core';
import {AuthTokenService} from '../../auth-token/auth-token.service'
import {
    Response
} from '@angular/http';


import { Observable } from 'rxjs/Observable';


@Injectable()
export class ItemsService {

  constructor(private authService: AuthTokenService) { }
  //private userOptions: any;

  private itemData: any;
  private userOptions: any = {
    userPath: 'items'
  }

  // Validate token request
  getItemsByID(id): Observable<Response> {

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

  getItems(): Observable<Response> {
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
  addItems(body): Observable<Response> {
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
  editItems(body, id): Observable<Response> {
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

  getUnits() {
    let units;
    units =[
      {
        "code": "BAG",
        "name": "Bag"
      },
      {
        "code": "BKT",
        "name": "Bucket"
      },
      {
        "code": "BND",
        "name": "Bundle"
      },
      {
        "code": "BOWL",
        "name": "Bowl"
      },
      {
        "code": "BX",
        "name": "Box"
      },
      {
        "code": "CRD",
        "name": "Card"
      },
      {
        "code": "CM",
        "name": "Centimeters"
      },
      {
        "code": "CS",
        "name": "Case"
      },
      {
        "code": "CTN",
        "name": "Carton"
      },
      {
        "code": "DZ",
        "name": "Dozen"
      },
      {
        "code": "EA",
        "name": "Each"
      },
      {
        "code": "FT",
        "name": "Foot"
      },
      {
        "code": "GAL",
        "name": "Gallon"
      },
      {
        "code": "GROSS",
        "name": "Gross"
      },
      {
        "code": "IN",
        "name": "Inches"
      },
      {
        "code": "KIT",
        "name": "Kit"
      },
      {
        "code": "LOT",
        "name": "Lot"
      },
      {
        "code": "M",
        "name": "Meter"
      },
      {
        "code": "MM",
        "name": "Millimeter"
      },
      {
        "code": "PC",
        "name": "Piece"
      },
      {
        "code": "PK",
        "name": "Pack"
      },
      {
        "code": "PK100",
        "name": "Pack 100"
      },
      {
        "code": "PK50",
        "name": "Pack 50"
      },
      {
        "code": "PR",
        "name": "Pair"
      },
      {
        "code": "RACK",
        "name": "Rack"
      },
      {
        "code": "RL",
        "name": "Roll"
      },
      {
        "code": "SET",
        "name": "Set"
      },
      {
        "code": "SET3",
        "name": "Set of 3"
      },
      {
        "code": "SET4",
        "name": "Set of 4"
      },
      {
        "code": "SET5",
        "name": "Set of 5"
      },
      {
        "code": "SGL",
        "name": "Single"
      },
      {
        "code": "SHT",
        "name": "Sheet"
      },
      {
        "code": "SQFT",
        "name": "Square ft"
      },
      {
        "code": "TUBE",
        "name": "Tube"
      },
      {
        "code": "YD",
        "name": "Yard"
      }
     ];
    return units;
  }


}
