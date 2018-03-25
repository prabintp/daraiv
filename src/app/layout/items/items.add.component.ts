import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { ItemsService } from './items.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-items',
    templateUrl: './items.add.component.html',
    styleUrls: ['./items.component.scss'],
    animations: [routerTransition()]
})
export class ItemsAddComponent implements OnInit {
  private itemsForm: FormGroup;
  private rows: any = [];
  itemsdata = {
    notes: '',
    desc: '',
    name: '',
    access_token: '',
    shop: '',
    createdBy: '',
  };
    constructor(
      private _fb: FormBuilder,
      private itemsService: ItemsService,
      private router: Router) {
    }
    ngOnInit() {
      this.initForm();
    }

    initForm(){
      this.itemsForm = this._fb.group({
         name: ['', [Validators.required]],
         sku: ['', [Validators.required]],
         quantity: ['', [Validators.required]],
         unitprice: ['', [Validators.required]],
         actualprice: ['', [Validators.required]],
         desc:[''],
         notes:[''],

       });
    }

    onAdd(){
      this.itemsService.addItems(this.itemsForm.value).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/items']) : this.router.navigate(['/404'])
     );
    }



}
