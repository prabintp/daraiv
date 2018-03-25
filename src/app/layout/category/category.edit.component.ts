import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { CategoryService } from './category.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-category',
    templateUrl: './category.edit.component.html',
  //  styleUrls: ['./category.component.scss'],
    animations: [routerTransition()]
})
export class CategoryEditComponent implements OnInit {
  private categoryForm: FormGroup;
  private rows: any = [];
  currentItemID: any;
  categorydata = {
    desc: '',
    name: ''
  };
    constructor(
      private _fb: FormBuilder,
      private categoryService: CategoryService,
      private router: Router,
      private route: ActivatedRoute) {
    }
    ngOnInit() {
      this.initForm();
      this.currentItemID = this.route.snapshot.params['id'];
      this.getCategory(this.currentItemID);
    }

    initForm(){
      this.categoryForm = this._fb.group({
         name: ['', [Validators.required]],
         desc:['']
       });
    }

    private patchForm() {
      this.categoryForm.setValue({
        name: this.categorydata.name,
        desc: this.categorydata.desc
      });
    }


    getCategory(id) {
      this.categoryService.getCategoryByID(id).subscribe(
        res => { if (res.status === 200 || res.status === 304) {
        //  let resdata = res.json().rows;
          this.categorydata = res.json();
          this.patchForm();
       }
      else{
        // this.categorydata = []
       }
     }

     );
   }
    onEdit(){
      this.categoryService.editCategory(this.categoryForm.value, this.currentItemID).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/category']) : this.router.navigate(['/404'])
     );
    }



}
