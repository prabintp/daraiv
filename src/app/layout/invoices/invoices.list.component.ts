import { Injectable } from '@angular/core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { routerTransition } from '../../router.animations';
import { InvoicesService } from './invoices.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.list.component.html',
    styleUrls: ['./invoices.component.scss'],
    animations: [routerTransition()]
})
export class InvoicesListComponent implements OnInit {
    public rows: any = [];
    temp = [];
    columns = [];
    loading: boolean = false;
    @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
    @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
    @ViewChild('dateTpl') dateTpl: TemplateRef<any>;
    constructor(private invoicesService: InvoicesService, private router: Router) {
        this.loading = true;
        this.invoicesService.getInvoices().subscribe(
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
        { prop: 'invoice_number' },
        { prop: 'status' },
        { name: 'total' },
        {
          cellTemplate: this.editTmpl,
          headerTemplate: this.hdrTpl,
          name: 'id'
        },
      ];

    }

    onDelete(id){
      this.invoicesService.deleteItem(id).subscribe(
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

    if(field == 'invoice_number'){
      const temp = this.temp.filter(function(d) {
        return d.invoice_number.toLowerCase().indexOf(val) !== -1 || !val ;
      });
      this.rows = temp;
    }
  }



}