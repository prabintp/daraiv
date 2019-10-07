import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { AccountsService } from './accounts.service';
import { Accounts } from './accounts.interface';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.add.component.html',
  //  styleUrls: ['./accounts.component.scss'],
    animations: [routerTransition()]
})
export class AccountsEditComponent implements OnInit {
  public accountsForm: FormGroup;
  private rows: any = [];
  currentItemID: any;
  public accountOption: any;
  accountsdata: Accounts;
    constructor(
      private _fb: FormBuilder,
      private accountsService: AccountsService,
      private router: Router,
      private route: ActivatedRoute) {
        this.accountsService.getAccountTypes().subscribe(
          res => {
          if (res.status === 200 || res.status === 304) {
            const resdata = res.json().rows;
           // this.rows = res.json().rows;
            this.accountOption = [...resdata];
         } else {
           this.accountOption = [];
         }
       }
      );

    }
    ngOnInit() {
      this.initForm();
      this.currentItemID = this.route.snapshot.params['id'];
      this.getAccounts(this.currentItemID);
    }

    initForm(){
      this.accountsForm = this._fb.group({
         name: ['', [Validators.required]],
         desc:[''],
         accounttype: [this.accountOption, [Validators.required]]
       });
    }

    private patchForm() {
      this.accountsForm.setValue({
        name: this.accountsdata.name,
        desc: this.accountsdata.desc,
        accounttype: this.accountsdata.accounttype ? this.accountsdata.accounttype.id : ''
      });
     // this.accountsForm.patchValue(this.accountsdata);
    }


    getAccounts(id) {
      this.accountsService.getAccountsByID(id).subscribe(
        res => { if (res.status === 200 || res.status === 304) {
        //  let resdata = res.json().rows;
          this.accountsdata = res.json();
          this.patchForm();
       }
      else{
         this.accountsdata = []
       }
     }

     );
   }
    onAdd(){
      this.accountsService.editAccounts(this.accountsForm.value, this.currentItemID).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/accounts']) : this.router.navigate(['/404'])
     );
    }



}
