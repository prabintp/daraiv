import { Injectable } from '@angular/core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { routerTransition } from '../../router.animations';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { InvoicesViewComponent } from './invoices.view.component';
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
    loading: Boolean = false;
    docType: String;
    @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
    @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
    @ViewChild('dateTpl') dateTpl: TemplateRef<any>;
    constructor(private invoicesService: InvoicesService,
       private router: Router,
       private activatedRoute: ActivatedRoute,
       private modalService: NgbModal
     ){
       // same as above
      //  this.activatedRoute.url.subscribe((url: urlSegment)=> console.log(url[0].path));
      this.docType = this.router.routerState.snapshot.url.split('/')[1];
       console.log(this.router.routerState.snapshot.url[1]);
        this.loading = true;
        this.invoicesService.getInvoices(this.docType).subscribe(
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
        { prop: 'invoice_number',
          name:  'ID#'},
        { prop: 'status' },
        { prop: 'customer_name',
          name: this.docType === 'purchaseorders' ? 'Vendor' : 'Customer' },
        { prop: 'total' },

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

    openPrintView(invoiceId) {
      const modalRef = this.modalService.open(InvoicesViewComponent, { size: 'lg' });
      modalRef.componentInstance.invoiceId = invoiceId;
      return false;
    };

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
