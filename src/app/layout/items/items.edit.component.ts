import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { ItemsService } from './items.service';
import { CategoryService } from '../category/category.service';
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
  public itemsForm: FormGroup;
  private rows: any = [];
  public listCategory = [];
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
    category:{id:'', name:''},
    actualprice: ''
  };
    constructor(
      private _fb: FormBuilder,
      private itemsService: ItemsService,
      private _categoryService: CategoryService,
      private router: Router,
      private route: ActivatedRoute) {
    }
    ngOnInit() {
      this.loadCategory();
      this.initForm();
      this.currentItemID = this.route.snapshot.params['id'];
      this.getItems(this.currentItemID);
    }

    loadCategory(){
      this._categoryService.getCategory().subscribe(
        res => {
      if (res.status === 200 || res.status === 304) {
          let resdata = res.json().rows;
        //  this.rows = res.json().rows;
          this.listCategory = [...resdata];
       }
      else{
         this.listCategory = []
       }
     }
    );
   };

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
         createdBy:[''],
         category: ['']

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
        category: this.itemsdata.category ? this.itemsdata.category.id : '',
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

   autocompleItems = (data: any) : any => {
     let html = `<span>${data.name}</span>`;
     return html;
   }
   setValueCategory(e){
     this.itemsForm.get('category').setValue(e.id);
   }

    onEdit(){
      this.itemsService.editItems(this.itemsForm.value, this.currentItemID).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/items']) : this.router.navigate(['/404'])
     );
    }



}
