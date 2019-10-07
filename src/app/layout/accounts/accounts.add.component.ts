import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
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
export class AccountsAddComponent implements OnInit {
  public accountsForm: FormGroup;
  private rows: any = [];
  public accountOption: any;
  constructor(private _fb: FormBuilder,
    private accountsService: AccountsService,
    private router: Router) {
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
     // this.accountOption = this.accountsService.getAccountTypes();
    }
    initForm() {
      this.accountsForm = this._fb.group({
         name: ['', [Validators.required]],
         desc: [''],
         accounttype: [ null, [Validators.required]]
       });
    }
    onAdd(){
      this.accountsService.addAccounts(this.accountsForm.value).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/accounts']) : this.router.navigate(['/404'])
     );
    }
}
