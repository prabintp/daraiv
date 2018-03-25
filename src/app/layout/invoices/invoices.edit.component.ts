import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { InvoicesService } from './invoices.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.edit.component.html',
  //  styleUrls: ['./invoices.component.scss'],
    animations: [routerTransition()]
})
export class InvoicesEditComponent implements OnInit {
  private rows: any = [];
  currentItemID: any;
  invoicesdata = {
    notes: '',
    desc: '',
    name: '',
    access_token: '',
    shop: '',
    createdBy: '',
  };
    constructor(private invoicesService: InvoicesService, private router: Router, private route: ActivatedRoute) {
    }
    ngOnInit() {
      this.currentItemID = this.route.snapshot.params['id'];
      this.getInvoices(this.currentItemID);
    }


    getInvoices(id) {
      this.invoicesService.getInvoicesByID(id).subscribe(
        res => { if (res.status === 200 || res.status === 304) {
        //  let resdata = res.json().rows;
          this.invoicesdata = res.json();
       }
      else{
        // this.invoicesdata = []
       }
     }

     );
   }
    onEdit(){
      this.invoicesService.editInvoices(this.invoicesdata, this.currentItemID).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/invoices']) : this.router.navigate(['/404'])
     );
    }



}
