import { Injectable } from '@angular/core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { routerTransition } from '../../router.animations';
import { TaxService } from './tax.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-tax',
    templateUrl: './tax.list.component.html',
  //  styleUrls: ['./tax.component.scss'],
    animations: [routerTransition()]
})
export class TaxListComponent implements OnInit {s
    public rows: any = [];
    temp = [];
    columns = [];
    loading: boolean = false;
    @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
    @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
    constructor(private taxService: TaxService, private router: Router) {
        this.loading = true;
        this.taxService.getTax().subscribe(
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
        { name: 'code' },
        { name: 'rate' },
        { name: 'type' },
        {
          cellTemplate: this.editTmpl,
          headerTemplate: this.hdrTpl,
          name: 'id'
        },
      ];

    }

    onDelete(id){
      this.taxService.deleteItem(id).subscribe(
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
