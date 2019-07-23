import { Injectable } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { InvoicesService } from './invoices.service';
import { ItemsService } from '../items/items.service';
import { TaxService } from '../tax/tax.service';
import { ContactsService } from '../contacts/contacts.service';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { UniqueInvoiceIdValidator} from './invoices-id-uniqe.directive';
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
  docType: string;
//  public lineItems;
  get lineItems() { return <FormArray>this.invoiceForm.get('line_items'); }

  public continents = [];
  public taxRates = [];
  public customerData = [];
  public purchaseOrder = [];
    constructor(private _fb: FormBuilder,
      private invoicesService: InvoicesService,
      private itemsService: ItemsService,
      private _taxService: TaxService,
      private _contactsService: ContactsService,
      private _uniqueInvoiceIdValidator: UniqueInvoiceIdValidator,
      private router: Router) {

      this.docType = this.router.routerState.snapshot.url.split('/')[1];
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
	
	 this.invoicesService.getInvoices('purchaseorders').subscribe(
          res => { if (res.status === 200 || res.status === 304) {
            let resdata = res.json().rows;
            // this.rows = res.json().rows;
            this.purchaseOrder = [...resdata];
         }
        else{
           this.purchaseOrder = []
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

  this._contactsService.getContacts().subscribe(
    res => { if (res.status === 200 || res.status === 304) {
      let resdata = res.json().rows;
    //  this.rows = res.json().rows;
      this.customerData = [...resdata];
   }
  else{
     console.log(res.status + 'service error');
   }
 }
);

  this.invoiceForm = this._fb.group({
           name: [''],
           invoice_number: ['', { Validators: [Validators.minLength(5)],
            asyncValidators: [this._uniqueInvoiceIdValidator.validate.bind(this._uniqueInvoiceIdValidator)],
            updateOn: 'blur'
          } ],
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
           customer:[''],
           sales_person:[''],
		       purchase_order: [''],
		       purchase_order_name: [''],
           customer_name:[''],
           sales_person_name:[''],
           doc_type:[this.docType],
		   shipping_date: [''],
		   shipping_method: [''],
		   payment_terms: [''],
           line_items: this._fb.array([
               this.initLineitems(),
           ])
  });
  this.bInit();
  }

  ngOnInit(){
    console.log(this.router.routerState.snapshot.url.split( '/' )[1]+'urll');
  };

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
        self.invoiceForm.controls['subtotal'].setValue((subtotal).toFixed(2));
        self.invoiceForm.controls['total'].setValue( (subtotal  + parseFloat(self.invoiceForm.value.totalTax)).toFixed(2));
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
       self.invoiceForm.controls['totalTax'].setValue(parseFloat(total_tax).toFixed(2));
       self.invoiceForm.controls['tax_type'].setValue(selectedTax.type);
       self.invoiceForm.controls['tax_rate'].setValue(selectedTax.rate);
       self.invoiceForm.controls['total'].setValue((parseFloat(self.invoiceForm.value.subtotal) + parseFloat(total_tax)).toFixed(2));
     });
  }

    initLineitems() {
       return this._fb.group({
           item_id: ['', Validators.required],
           quantity: [''],
           item_name: [''],
           rate: [''],
           item_total: [''],
           sku: [''],
           unit: ['']
       });
   }

   myValueFormatter(data: any): string {
     return `${data.sku}`;
   }

   updateItemTotal(item){
      this.invoiceForm.get('line_items');
   }

    onSubmit(){

      if (this.invoiceForm.invalid) {
        this.invoiceForm.get('invoice_number').markAsTouched();
        this.invoiceForm.get('name').markAsTouched();
        return;
      }


      var invdata = this.invoiceForm.value;
      if(invdata.sales_person === ''){
        delete invdata.sales_person;
      }

      if(invdata.customer === ''){
        delete invdata.customer;
      }
      if (invdata.purchase_order === '') {
        delete invdata.purchase_order;
      }

      this.invoicesService.addInvoices(invdata).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/invoices']) : this.router.navigate(['/404'])
     );
    }

    autocompleItems = (data: any) : any => {
      let html = `<span>${data.name} - ${data.sku}</span>`;
      return html;
    }

    autocompleCustomer = (data: any) : any => {
      let html = `<span>${data.name}`;
      return html;
    }
	autocomplePurchaseOrder = (data: any) : any => {
      let html = `<span>${data.invoice_number}`;
      return html;
    }

    myPOFormatter(data: any): string {
      return `${data.invoice_number}`;
    }

    onChangeItem(e, index, quantity){
      const lineitems = <FormArray>this.invoiceForm.controls['line_items'];
      const currentLineItem=  <FormArray>lineitems.controls[index];
      currentLineItem.controls['quantity'].setValue(quantity);
      currentLineItem.controls['item_name'].setValue(e.name);
      currentLineItem.controls['rate'].setValue(e.unitprice);
      currentLineItem.controls['item_id'].setValue(e.id);
      currentLineItem.controls['sku'].setValue(e.sku);
      currentLineItem.controls['unit'].setValue(e.unit);
      currentLineItem.controls['item_total'].setValue(currentLineItem.controls['quantity'].value * e.unitprice);
    }

    onChangeCustomer(e){
        this.invoiceForm.controls['customer'].setValue(e.id);
        this.invoiceForm.controls['customer_name'].setValue(e.name);
    }
    onChangeSalesPerson(e){
      this.invoiceForm.controls['sales_person'].setValue(e.id);
      this.invoiceForm.controls['sales_person_name'].setValue(e.name);
    }
	onChangePurchaseOrder(e){
      this.invoiceForm.controls['purchase_order'].setValue(e.id);
      this.invoiceForm.controls['purchase_order_name'].setValue(e.invoice_number);
    }
    addItemRow(){
      event.preventDefault();
      const control = <FormArray>this.invoiceForm.controls['line_items'];
      control.push(this.initLineitems());
    //  this.line_items.push({item_id:'',quantity:'',rate:'',item_total:''})
    }

    removeLineitems(i: number) {
      event.preventDefault();
        const control = <FormArray>this.invoiceForm.controls['line_items'];
        control.removeAt(i);
    }



}
