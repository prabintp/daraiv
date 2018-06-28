import { Injectable } from '@angular/core';
import { Component, OnInit, Input} from '@angular/core';
import { routerTransition } from '../../router.animations';
import {NgbModal, ModalDismissReasons, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Printd } from 'printd';

// import {printjs} from 'print-js/src/index.js';
import printJS from 'print-js';

import { InvoicesService } from './invoices.service';

// import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-invoice1',
    templateUrl: './invoices.view.component.html',
    styleUrls: ['./invoices.view.component.scss'],
    animations: [routerTransition()]
})
export class InvoicesViewComponent implements OnInit {
//  public invoiceForm: FormGroup;
  public invoiceData: any;
  @Input() invoiceId;

  currentItemID: any;

    constructor(
      private invoicesService: InvoicesService,
    //  private printit: printjs,
       private modalService: NgbModal
     ) {


    }
    printv() {
      const d = new Printd();
      const cssText = `table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent; }
  .table th,
  .table td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6; }
  .table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6; }
  .table tbody + tbody {
    border-top: 2px solid #dee2e6; }
  .table .table {
    background-color: #fff; }

.table-sm th,
.table-sm td {
  padding: 0.3rem; }

.table-bordered {
  border: 1px solid #dee2e6; }
  .table-bordered th,
  .table-bordered td {
    border: 1px solid #dee2e6; }
  .table-bordered thead th,
  .table-bordered thead td {
    border-bottom-width: 2px; }

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05); }

.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.075); }

.table-primary,
.table-primary > th,
.table-primary > td {
  background-color: #b8daff; }

.table-hover .table-primary:hover {
  background-color: #9fcdff; }
  .table-hover .table-primary:hover > td,
  .table-hover .table-primary:hover > th {
    background-color: #9fcdff; }

.table-secondary,
.table-secondary > th,
.table-secondary > td {
  background-color: #dddfe2; }

.table-hover .table-secondary:hover {
  background-color: #cfd2d6; }
  .table-hover .table-secondary:hover > td,
  .table-hover .table-secondary:hover > th {
    background-color: #cfd2d6; }

.table-success,
.table-success > th,
.table-success > td {
  background-color: #c3e6cb; }

.table-hover .table-success:hover {
  background-color: #b1dfbb; }
  .table-hover .table-success:hover > td,
  .table-hover .table-success:hover > th {
    background-color: #b1dfbb; }

.table-info,
.table-info > th,
.table-info > td {
  background-color: #bee5eb; }

.table-hover .table-info:hover {
  background-color: #abdde5; }
  .table-hover .table-info:hover > td,
  .table-hover .table-info:hover > th {
    background-color: #abdde5; }

.table-warning,
.table-warning > th,
.table-warning > td {
  background-color: #ffeeba; }

.table-hover .table-warning:hover {
  background-color: #ffe8a1; }
  .table-hover .table-warning:hover > td,
  .table-hover .table-warning:hover > th {
    background-color: #ffe8a1; }

.table-danger,
.table-danger > th,
.table-danger > td {
  background-color: #f5c6cb; }

.table-hover .table-danger:hover {
  background-color: #f1b0b7; }
  .table-hover .table-danger:hover > td,
  .table-hover .table-danger:hover > th {
    background-color: #f1b0b7; }

.table-light,
.table-light > th,
.table-light > td {
  background-color: #fdfdfe; }

.table-hover .table-light:hover {
  background-color: #ececf6; }
  .table-hover .table-light:hover > td,
  .table-hover .table-light:hover > th {
    background-color: #ececf6; }

.table-dark,
.table-dark > th,
.table-dark > td {
  background-color: #c6c8ca; }

.table-hover .table-dark:hover {
  background-color: #b9bbbe; }
  .table-hover .table-dark:hover > td,
  .table-hover .table-dark:hover > th {
    background-color: #b9bbbe; }

.table-active,
.table-active > th,
.table-active > td {
  background-color: rgba(0, 0, 0, 0.075); }

.table-hover .table-active:hover {
  background-color: rgba(0, 0, 0, 0.075); }
  .table-hover .table-active:hover > td,
  .table-hover .table-active:hover > th {
    background-color: rgba(0, 0, 0, 0.075); }

.table .thead-dark th {
  color: #fff;
  background-color: #212529;
  border-color: #32383e; }

.table .thead-light th {
  color: #495057;
  background-color: #e9ecef;
  border-color: #dee2e6; }

.table-dark {
  color: #fff;
  background-color: #212529; }
  .table-dark th,
  .table-dark td,
  .table-dark thead th {
    border-color: #32383e; }
  .table-dark.table-bordered {
    border: 0; }
  .table-dark.table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(255, 255, 255, 0.05); }
  .table-dark.table-hover tbody tr:hover {
    background-color: rgba(255, 255, 255, 0.075); }
      .col-6,
      .col-12 {
      	float: left
      }

      .col-12 {
      	width: 100%
      }

      .col-6 {
      	width: 50%
      }

  hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1); }
  .inv-print {
    padding: 15px;
}h1,
.h1,
h2,
.h2,
h3,
.h3 {
	margin-top: 20px;
	margin-bottom: 10px
}
h1,
.h1 {
	font-size: 36px
}

h2,
.h2 {
	font-size: 30px
}
.text-left {
	text-align: left
}

.text-right {
	text-align: right
}

.text-center {
	text-align: center
}

.text-justify {
	text-align: justify
}
.table-condensed>thead>tr>th,
.table-condensed>tbody>tr>th,
.table-condensed>tfoot>tr>th,
.table-condensed>thead>tr>td,
.table-condensed>tbody>tr>td,
.table-condensed>tfoot>tr>td {
	padding: 5px
}

.table-bordered {
	border: 1px solid #ddd
}

.table-bordered>thead>tr>th,
.table-bordered>tbody>tr>th,
.table-bordered>tfoot>tr>th,
.table-bordered>thead>tr>td,
.table-bordered>tbody>tr>td,
.table-bordered>tfoot>tr>td {
	border: 1px solid #ddd
}

.table-bordered>thead>tr>th,
.table-bordered>thead>tr>td {
	border-bottom-width: 2px
}

.table-striped>tbody>tr:nth-of-type(odd) {
	background-color: #f9f9f9
}

.table-hover>tbody>tr:hover {
	background-color: #f5f5f5
}

table col[class*="col-"] {
	position: static;
	float: none;
	display: table-column
}

table td[class*="col-"],
table th[class*="col-"] {
	position: static;
	float: none;
	display: table-cell
}

.table>thead>tr>td.active,
.table>tbody>tr>td.active,
.table>tfoot>tr>td.active,
.table>thead>tr>th.active,
.table>tbody>tr>th.active,
.table>tfoot>tr>th.active,
.table>thead>tr.active>td,
.table>tbody>tr.active>td,
.table>tfoot>tr.active>td,
.table>thead>tr.active>th,
.table>tbody>tr.active>th,
.table>tfoot>tr.active>th {
	background-color: #f5f5f5
}

.table-hover>tbody>tr>td.active:hover,
.table-hover>tbody>tr>th.active:hover,
.table-hover>tbody>tr.active:hover>td,
.table-hover>tbody>tr:hover>.active,
.table-hover>tbody>tr.active:hover>th {
	background-color: #e8e8e8
}

.table>thead>tr>td.success,
.table>tbody>tr>td.success,
.table>tfoot>tr>td.success,
.table>thead>tr>th.success,
.table>tbody>tr>th.success,
.table>tfoot>tr>th.success,
.table>thead>tr.success>td,
.table>tbody>tr.success>td,
.table>tfoot>tr.success>td,
.table>thead>tr.success>th,
.table>tbody>tr.success>th,
.table>tfoot>tr.success>th {
	background-color: #dff0d8
}

.table-hover>tbody>tr>td.success:hover,
.table-hover>tbody>tr>th.success:hover,
.table-hover>tbody>tr.success:hover>td,
.table-hover>tbody>tr:hover>.success,
.table-hover>tbody>tr.success:hover>th {
	background-color: #d0e9c6
}

.table>thead>tr>td.info,
.table>tbody>tr>td.info,
.table>tfoot>tr>td.info,
.table>thead>tr>th.info,
.table>tbody>tr>th.info,
.table>tfoot>tr>th.info,
.table>thead>tr.info>td,
.table>tbody>tr.info>td,
.table>tfoot>tr.info>td,
.table>thead>tr.info>th,
.table>tbody>tr.info>th,
.table>tfoot>tr.info>th {
	background-color: #d9edf7
}

.table-hover>tbody>tr>td.info:hover,
.table-hover>tbody>tr>th.info:hover,
.table-hover>tbody>tr.info:hover>td,
.table-hover>tbody>tr:hover>.info,
.table-hover>tbody>tr.info:hover>th {
	background-color: #c4e3f3
}

.table>thead>tr>td.warning,
.table>tbody>tr>td.warning,
.table>tfoot>tr>td.warning,
.table>thead>tr>th.warning,
.table>tbody>tr>th.warning,
.table>tfoot>tr>th.warning,
.table>thead>tr.warning>td,
.table>tbody>tr.warning>td,
.table>tfoot>tr.warning>td,
.table>thead>tr.warning>th,
.table>tbody>tr.warning>th,
.table>tfoot>tr.warning>th {
	background-color: #fcf8e3
}

.table-hover>tbody>tr>td.warning:hover,
.table-hover>tbody>tr>th.warning:hover,
.table-hover>tbody>tr.warning:hover>td,
.table-hover>tbody>tr:hover>.warning,
.table-hover>tbody>tr.warning:hover>th {
	background-color: #faf2cc
}

.table>thead>tr>td.danger,
.table>tbody>tr>td.danger,
.table>tfoot>tr>td.danger,
.table>thead>tr>th.danger,
.table>tbody>tr>th.danger,
.table>tfoot>tr>th.danger,
.table>thead>tr.danger>td,
.table>tbody>tr.danger>td,
.table>tfoot>tr.danger>td,
.table>thead>tr.danger>th,
.table>tbody>tr.danger>th,
.table>tfoot>tr.danger>th {
	background-color: #f2dede
}

.table-hover>tbody>tr>td.danger:hover,
.table-hover>tbody>tr>th.danger:hover,
.table-hover>tbody>tr.danger:hover>td,
.table-hover>tbody>tr:hover>.danger,
.table-hover>tbody>tr.danger:hover>th {
	background-color: #ebcccc
}

.table-responsive {
	overflow-x: auto;
	min-height: 0.01%
}address {
	margin-bottom: 20px;
	font-style: normal;
	line-height: 1.42857143
}`;
      // opens the "print dialog" of your browser to print the element
      d.print( document.getElementById('inv-print'), cssText )

    //  printJS({ printable: 'inv-print', type: 'html', header: '' });
    }
    ngOnInit() {
    //  this.currentItemID = this.route.snapshot.params['id'];
      this.getInvoices(this.invoiceId);
    }




    getInvoices(id) {
      this.invoicesService.getInvoicesViewByID(id).subscribe(
        res => { if (res.status === 200 || res.status === 304) {
          this.invoiceData = res.json();
          this.invoiceData.customer.baddress = this.invoiceData.customer.baddress.replace(/(?:\r\n|\r|\n)/g, '<br>');
          this.invoiceData.customer.saddress = this.invoiceData.customer.saddress.replace(/(?:\r\n|\r|\n)/g, '<br>');
          let invdate = this.invoiceData.invoice_date;
          let total_tax = (this.invoiceData.tax_type === 'fixed') ? this.invoiceData.tax_rate : parseInt(this.invoiceData.subtotal) * (parseInt(this.invoiceData.tax_rate)/100) ;
          this.invoiceData.invoiceDate = new Date(invdate.year, invdate.month - 1, invdate.day);
          this.invoiceData.total_tax = total_tax;
          console.log(this.invoiceData.invoiceData);
       }
      else{
        // this.invoicesdata = []
       }
     }
     );
   }
}
