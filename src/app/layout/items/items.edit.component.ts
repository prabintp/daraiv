import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
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
    templateUrl: './items.edit.component.html',
  //  styleUrls: ['./items.component.scss'],
    animations: [routerTransition()]
})
export class ItemsEditComponent implements OnInit {
  private itemsForm: FormGroup;
  private rows: any = [];
  currentItemID: any;
  itemsdata = {
    notes: '',
    desc: '',
    name: '',
    access_token: '',
    shop: '',
    createdBy: '',
    sku:'',
    quantity:'',
    unitprice: '',
    actualprice: ''
  };
    constructor(
      private _fb: FormBuilder,
      private itemsService: ItemsService,
      private router: Router,
      private route: ActivatedRoute) {
    }
    ngOnInit() {
      this.initForm();
      this.currentItemID = this.route.snapshot.params['id'];
      this.getItems(this.currentItemID);
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
         shop:[''],
         createdBy:['']

       });
    }

    private patchForm() {
      this.itemsForm.setValue({
        name: this.itemsdata.name,
        desc: this.itemsdata.desc,
        sku: this.itemsdata.sku,
        quantity: this.itemsdata.quantity,
        unitprice: this.itemsdata.unitprice,
        actualprice: this.itemsdata.actualprice,
        notes: this.itemsdata.notes || '',
        shop: this.itemsdata.shop,
        createdBy: this.itemsdata.createdBy || ''
      });
    }

    getItems(id) {
      this.itemsService.getItemsByID(id).subscribe(
        res => { if (res.status === 200 || res.status === 304) {
        //  let resdata = res.json().rows;
          this.itemsdata = res.json();
          this.patchForm();
       }
      else{
        // this.itemsdata = []
       }
     }

     );
   }
    onEdit(){
      this.itemsService.editItems(this.itemsForm.value, this.currentItemID).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/items']) : this.router.navigate(['/404'])
     );
    }



}
