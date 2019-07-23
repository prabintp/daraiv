import { Component, OnInit, Injectable, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { OrganisationService } from './organisation.service';
import {AuthTokenService} from '../../auth-token/auth-token.service';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Injectable()
@Component({
    selector: 'app-organisation',
    templateUrl: './organisation.profile.component.html',
    animations: [routerTransition()]
})
export class OrganisationProfileComponent implements OnInit {
    public organisationdata: any;
    public currentShop: any;
    public OrganisationForm: FormGroup;

    constructor(
        private _organisationService: OrganisationService,
        private authService: AuthTokenService,
        private _fb: FormBuilder,
      ) {

        this.OrganisationForm = this._fb.group({
            name: ['', [Validators.required, Validators.minLength(20)]],
            address : [''],
            bank : [''],
            print : this._fb.group(
            {
              footer_text : [''],
              terms_condition : ['']
            }),
            trn : [''],
            email : [''],
            logo: []
          });



      }

      ngOnInit() {
        this.currentShop = JSON.parse(this.authService.currentAuthData.currentShop).sid.id;
        this.getItem(this.currentShop);
      }
      private patchForm() {
        const self = this;
        this.OrganisationForm.patchValue(this.organisationdata);
      }
      getItem(id) {
        this._organisationService.getOrganisationByID(id).subscribe(
          res => { if (res.status === 200 || res.status === 304) {
          //  let resdata = res.json().rows;
            this.organisationdata = res.json();
            this.patchForm();
         } else {
          // this.itemsdata = []
         }
       }
       );
     }

     onSubmit() {
      const invdata = this.OrganisationForm.value;
     this._organisationService.editOrganisation(invdata, this.currentShop).subscribe(
        res => res.status === 200 || res.status === 201 ? console.log('updated Successfully') : console.log('updated errror') );
    }

   /* onLogoUploadFinished(res) {
      this.OrganisationForm.controls['logo'].setValue(res.src);
    } */

}
