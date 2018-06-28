import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { OrganisationService } from './organisation.service';
import {AuthTokenService} from '../../auth-token/auth-token.service';

@Component({
    selector: 'app-organisation',
    templateUrl: './organisation.component.html',
    styleUrls: ['./organisation.component.scss'],
    animations: [routerTransition()]
})
export class OrganisationComponent implements OnInit {
    public organisationdata: any;
    public currentShop: any;

    constructor(
      private _organisationService:OrganisationService,
      private authService: AuthTokenService
    ) {}

    ngOnInit() {
      this.currentShop = JSON.parse(this.authService.currentAuthData.currentShop).sid.id;
      this.getItem(this.currentShop);
    }

    getItem(id) {
      this._organisationService.getOrganisationByID(id).subscribe(
        res => { if (res.status === 200 || res.status === 304) {
        //  let resdata = res.json().rows;
          this.organisationdata = res.json();
       }
      else{
        // this.itemsdata = []
       }
     }

     );
   }


}
