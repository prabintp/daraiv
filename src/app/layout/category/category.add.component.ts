import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { CategoryService } from './category.service';
import { Category } from './category.interface';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-category',
    templateUrl: './category.add.component.html',
  //  styleUrls: ['./category.component.scss'],
    animations: [routerTransition()]
})
export class CategoryAddComponent implements OnInit {
  private categoryForm: FormGroup;
  private rows: any = [];
  constructor(private _fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router) {
    }
    ngOnInit() {
     this.initForm();
    }
    initForm(){
      this.categoryForm = this._fb.group({
         name: ['', [Validators.required]],
         desc:['']
       });
    }
    onAdd(){
      this.categoryService.addCategory(this.categoryForm.value).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/category']) : this.router.navigate(['/404'])
     );
    }
}
