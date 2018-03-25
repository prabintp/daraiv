import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { InvoicesService } from './invoices.service';
import { ItemsService } from '../items/items.service';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

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
  private invoiceForm: FormGroup;
  private rows: any = [];
  private line_items1: any = [{item_id:'',quantity:'',rate:'',item_total:''}, {item_id:'',quantity:'',rate:'',item_total:''}];

  public continents = [];
    constructor(private _fb: FormBuilder,
      private invoicesService: InvoicesService,
      private itemsService: ItemsService,
      private router: Router) {
      this.itemsService.getItems().subscribe(
        res => { if (res.status === 200 || res.status === 304) {
          let resdata = res.json().rows;
        //  this.rows = res.json().rows;
          this.continents = [...resdata];
       }
      else{
         this.rows = []
       }
     }
    );


    this.invoiceForm = this._fb.group({
           name: ['', [Validators.required, Validators.minLength(5)]],
           invoice_id: ['', [Validators.required, Validators.minLength(4)]],
           start_date:[''],
           due_date:[''],
           sub_total:['00'],
           total:['00'],
           discount:[''],
           line_items: this._fb.array([
               this.initLineitems(),
           ])
         });

          this.bInit();

    }

    ngOnInit(){

    };



    bInit(): void  {

               let self = this;

            /*   self.invoiceForm.get('item_total').valueChanges.subscribe((value) => {
                 console.log(value+'ddd');
               });*/

               self.invoiceForm.get('line_items').valueChanges.subscribe((value) => {
                 console.log(value);
                 let subtotal = 0;
                 value.forEach(function(i,a,as){
                   console.log(i.quantity+a);
                   let q = i.quantity;
                   let r= i.rate;
                   let itotal = q*r;
                  // self.invoiceForm.get('line_items').controls[a].get('item_id').setValue(itotal);
                   i.unitprice = r;
                  // setTimeout(function(){

                  //  self.invoiceForm.get('line_items').controls[a].get('item_id').setValue(itotal);


                //   },1000);

                  // self.updateItemTotal(i);
                //   this.onChangeItem(i, a);
                //   const lineitems = <FormArray>this.invoiceForm.controls['line_items'];
                //   const currentLineItem=  <FormArray>lineitems.controls[a];
                  // this.invoiceForm.controls['sub_total'].setValue(subtotal);
              ///   self.invoiceForm.controls['line_items'].controls[a].controls['item_total'].setValue(itotal);
                   subtotal = subtotal + itotal;
              //     if(this.invoiceForm){
                  //   this.invoiceForm.controls['sub_total'].setValue(subtotal);
              //     }
                 });

                 this.updateTotal(subtotal);


               });

    }

    initLineitems() {
       return this._fb.group({
           item_id: ['', Validators.required],
           quantity: ['20'],
           rate: [''],
           item_total: ['']
       });
   }

   updateTotal(total){
     this.invoiceForm.controls['sub_total'].setValue(total);
     this.invoiceForm.controls['total'].setValue(total);
   }

   onChangeQuantity(e, i){
     console.log(i+'dddd');
    // this.invoiceForm.get('line_items').controls[i].get('item_id').setValue(100);
   }

   updateItemTotal(item){
      this.invoiceForm.get('line_items');
   }

    onAdd(){
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
