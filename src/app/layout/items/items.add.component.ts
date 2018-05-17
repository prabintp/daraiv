import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
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
    templateUrl: './items.add.component.html',
    styleUrls: ['./items.component.scss'],
    animations: [routerTransition()]
})
export class ItemsAddComponent implements OnInit {
  public itemsForm: FormGroup;
  private rows: any = [];
  public listCategory = [];
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
      private _categoryService: CategoryService,
      private itemsService: ItemsService,
      private router: Router) {
    }
    ngOnInit() {
      this.loadCategory();
      this.initForm();
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


   autocompleItems = (data: any) : any => {
     let html = `<span>${data.name}</span>`;
     return html;
   }

   setValueCategory(e){
     this.itemsForm.get('category').setValue(e.id);
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
         category:['']

       });
    }

    onAdd(){
      this.itemsService.addItems(this.itemsForm.value).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/items']) : this.router.navigate(['/404'])
     );
    }



}
