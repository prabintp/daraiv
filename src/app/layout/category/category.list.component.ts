import { Injectable } from '@angular/core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { routerTransition } from '../../router.animations';
import { CategoryService } from './category.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-category',
    templateUrl: './category.list.component.html',
  //  styleUrls: ['./category.component.scss'],
    animations: [routerTransition()]
})
export class CategoryListComponent implements OnInit {
    public rows: any = [];
    temp = [];
    columns = [];
    loading: boolean = false;
    @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
    @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
    constructor(private categoryService: CategoryService, private router: Router) {
        this.loading = true;
        this.categoryService.getCategory().subscribe(
          res => { if (res.status === 200 || res.status === 304) {
            let resdata = res.json().rows;
            this.rows = res.json().rows;
            this.temp = [...resdata];
         }
        else{
           this.rows = []
         }
       }
      );

    }
    ngOnInit() {

      this.columns = [
        { prop: 'name' },
        { name: 'desc' },
        {
          cellTemplate: this.editTmpl,
          headerTemplate: this.hdrTpl,
          name: 'id'
        },
      ];

    }

    onDelete(id){
      this.categoryService.deleteItem(id).subscribe(
        res =>{if (res.status === 200 || res.status === 204){
          this.rows = this.rows.filter(function(d) {
            return d.id !== id ;
          });
        }}
     );
    }

    updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const field = event.target.id;

    // filter our data

    if(field == 'name'){
      const temp = this.temp.filter(function(d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val ;
      });
      this.rows = temp;
    }
  }



}
