import { Injectable } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { InvoicesService } from './invoices.service';
import { ItemsService } from '../items/items.service';
import { TaxService } from '../tax/tax.service';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { Invoice } from './invoices.interface';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.add.component.html',
    styleUrls: ['./invoices.component.scss'],
    animations: [routerTransition()]
})
export class InvoicesAddComponent implements OnInit {
  public invoiceForm: FormGroup;
  public rows: any = [];
  public item_total: any =[];
  public res: any = [];
//  public taxRates: any = [];
  private line_items1: any = [{item_id:'',quantity:'',rate:'',item_total:''}, {item_id:'',quantity:'',rate:'',item_total:''}];
//  public lineItems;
  get lineItems() { return <FormArray>this.invoiceForm.get('line_items'); }

  public continents = [];
  public taxRates = [];
    constructor(private _fb: FormBuilder,
      private invoicesService: InvoicesService,
      private itemsService: ItemsService,
      private _taxService: TaxService,
      private router: Router) {
      this.itemsService.getItems().subscribe(
        res => { if (res.status === 200 || res.status === 304) {
          let resdata = res.json().rows;
        //  this.rows = res.json().rows;
          this.continents = [...resdata];
       }
      else{
         console.log(res.status + 'service error');
       }
     }
    );

    this._taxService.getTax().subscribe(
      res => { if (res.status === 200 || res.status === 304) {
        let resdata = res.json().rows;
      //  this.rows = res.json().rows;
        this.taxRates = [...resdata];
     }
    else{
       console.log(res.status + 'service error');
     }
   }
  );

  this.invoiceForm = this._fb.group({
           name: ['', [Validators.required, Validators.minLength(5)]],
           invoice_number: ['', [Validators.required, Validators.minLength(4)]],
           invoice_date:[''],
           invoice_due:[''],
           subtotal:['00'],
           total:['00'],
           totalTax:['00'],
           discount:['00'],
           status:['pending'],
           tax:['0'],
           tax_rate:['0'],
           tax_type:['0'],
           line_items: this._fb.array([
               this.initLineitems(),
           ])
  });
  this.bInit();
  }

  ngOnInit(){};

  bInit(): void  {
    let self = this;
    self.invoiceForm.get('line_items').valueChanges.subscribe((value) => {
      console.log(value);
      let subtotal = 0;
      value.forEach(function(i,a,as){
        let q = i.quantity;
        let r= i.rate;
        let itotal = q*r;
        self.item_total[a] = itotal;
        subtotal = subtotal + itotal;
        self.invoiceForm.controls['subtotal'].setValue(subtotal);
        self.invoiceForm.controls['total'].setValue(subtotal  + parseInt(self.invoiceForm.value.totalTax));
        self.invoiceForm.controls['tax'].setValue(self.invoiceForm.value.tax);
      });
    });
    self.invoiceForm.controls['tax'].valueChanges.subscribe((value) => {
      if(value === '0'){
        self.invoiceForm.controls['total'].setValue(self.invoiceForm.value.total - self.invoiceForm.value.totalTax);
        self.invoiceForm.controls['totalTax'].setValue(0);
        self.invoiceForm.controls['tax_type'].setValue(0);
        self.invoiceForm.controls['tax_rate'].setValue(0);

        return false;
      }
       console.log(value);
       console.log(self.taxRates);
       var itm = self.taxRates;
       let selectedTax = self.taxRates.find(function(itm) {
         return itm.id == value;
       });
       console.log(selectedTax.id);
       let total_tax = (selectedTax.type === 'fixed') ? selectedTax.rate : parseInt(self.invoiceForm.value.subtotal) * (parseInt(selectedTax.rate)/100) ;
       self.invoiceForm.controls['totalTax'].setValue(total_tax);
       self.invoiceForm.controls['tax_type'].setValue(selectedTax.type);
       self.invoiceForm.controls['tax_rate'].setValue(selectedTax.rate);
       self.invoiceForm.controls['total'].setValue(self.invoiceForm.value.subtotal + total_tax);
     });
  }

    initLineitems() {
       return this._fb.group({
           item_id: ['', Validators.required],
           quantity: [''],
           item_name: [''],
           rate: [''],
           item_total: ['']
       });
   }

   updateTotal(total){
     this.invoiceForm.controls['subtotal'].setValue(total);
     this.invoiceForm.controls['total'].setValue(total);
   }

   onChangeQuantity(e, i){
     console.log(i+'dddd');
    // this.invoiceForm.get('line_items').controls[i].get('item_id').setValue(100);
   }

   myValueFormatter(data: any): string {
     return `${data.name}`;
   }

   updateItemTotal(item){
      this.invoiceForm.get('line_items');
   }

    onAdd(){

    /*  let res1:any = this.invoiceForm.value;
      this.res.data = res1;
      this.res.line_items = res1.line_items;
      delete this.res.data.line_items;*/
      this.invoicesService.addInvoices(this.invoiceForm.value).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/invoices']) : this.router.navigate(['/404'])
     );
    }

    autocompleItems = (data: any) : any => {
      let html = `<span>${data.name} - ${data.sku}</span>`;
      return html;
    }

    onChangeItem(e, index, quantity){
      const lineitems = <FormArray>this.invoiceForm.controls['line_items'];
      const currentLineItem=  <FormArray>lineitems.controls[index];
      currentLineItem.controls['quantity'].setValue(quantity);
      currentLineItem.controls['item_name'].setValue(e.name);
      currentLineItem.controls['rate'].setValue(e.unitprice);
      currentLineItem.controls['item_id'].setValue(e.id);
      currentLineItem.controls['item_total'].setValue(currentLineItem.controls['quantity'].value * e.unitprice);
    }


    addItemRow(){
      const control = <FormArray>this.invoiceForm.controls['line_items'];
      control.push(this.initLineitems());
    //  this.line_items.push({item_id:'',quantity:'',rate:'',item_total:''})
    }

    removeLineitems(i: number) {
        const control = <FormArray>this.invoiceForm.controls['line_items'];
        control.removeAt(i);
    }



}
