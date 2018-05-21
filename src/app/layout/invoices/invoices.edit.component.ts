import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { InvoicesService } from './invoices.service';
import { ItemsService } from '../items/items.service';
import { TaxService } from '../tax/tax.service';
import { ContactsService } from '../contacts/contacts.service';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.add.component.html',
  //  styleUrls: ['./invoices.component.scss'],
    animations: [routerTransition()]
})
export class InvoicesEditComponent implements OnInit {
  public invoiceForm: FormGroup;
  public invoiceData: any;
  public item_total: any =[];
  public rows: any = [];
  get lineItems() { return <FormArray>this.invoiceForm.get('line_items'); }
  currentItemID: any;
  invoicesdata = {
    notes: '',
    desc: '',
    name: '',
    access_token: '',
    shop: '',
    createdBy: '',
  };
  public continents = [];
  public taxRates = [];
  public customerData = [];
    constructor(private _fb: FormBuilder,
      private invoicesService: InvoicesService,
       private router: Router,
       private itemsService: ItemsService,
       private _contactsService: ContactsService,
       private _taxService: TaxService,
        private route: ActivatedRoute) {

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
                name: ['', [Validators.required, Validators.minLength(5)]],
                invoice_number: ['', [Validators.required, Validators.minLength(4)]],
                invoice_date:[''],
                invoice_due:[''],
                subtotal:['00'],
                total:['00'],
                totalTax:['00'],
                tax:['0'],
                tax_rate:['0'],
                tax_type:['0'],
                status:[''],
                customer:[''],
                sales_person:[''],
                customer_name:[''],
                sales_person_name:[''],
                line_items: this._fb.array([
                    this.initLineitems(),
                ])
              });

               this.bInit();
    }
    ngOnInit() {
      this.currentItemID = this.route.snapshot.params['id'];
      this.getInvoices(this.currentItemID);
    }

    bInit(): void  {

               let self = this;

            /*   self.invoiceForm.get('item_total').valueChanges.subscribe((value) => {
                 console.log(value+'ddd');
               });*/
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
                   self.invoiceForm.controls['total'].setValue(subtotal  + parseFloat(self.invoiceForm.value.totalTax).toFixed(2));
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

   updateItemTotal(item){
      this.invoiceForm.get('line_items');
   }

   private patchForm() {
     let self = this;
     for(let i=1; this.invoiceData.line_items.length > i ; i++){
       this.addItemRow();
     }
    /* this.invoiceForm.patchValue({
       invoice_number: this.invoiceData.invoice_number,
       invoice_date: this.invoiceData.invoice_date,
       name:'sds',
       invoice_due:this.invoiceData.invoice_due,
       subtotal:this.invoiceData.subtotal,
       total:this.invoiceData.total,
       discount:12,
       line_items:this.invoiceData.line_items


     });*/


     this.invoiceForm.patchValue(this.invoiceData);
      // this.invoiceForm.setControl('line_items', this._fb.array(this.invoiceData.line_items || []));

  //  this.lineItems.patchValue(this.invoiceData.line_items || []);
  /*  const control = <FormArray>this.invoiceForm.controls['line_items'];
    this.lineItems.controls.forEach(function(a,b){
      a.patchValue(self.invoiceData.line_items[b]);
    })*/

  /*  const control = <FormArray>this.invoiceForm.controls['line_items'];
    control.push(this._fb.group({
        item_id: ['', Validators.required],
        quantity: ['32'],
        rate: ['34'],
        item_total: ['44']
    }));*/

   }


    getInvoices(id) {
      this.invoicesService.getInvoicesByID(id).subscribe(
        res => { if (res.status === 200 || res.status === 304) {
        //  let resdata = res.json().rows;
        //  this.invoicesdata = res.json();
          this.invoiceData = res.json();
          this.patchForm();
       }
      else{
        // this.invoicesdata = []
       }
     }

     );
   }
    onSubmit(){
      this.invoicesService.editInvoices(this.invoiceForm.value, this.currentItemID).subscribe(
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

    myValueFormatter(data: any): string {
      return `${data.name}`;
    }

    onChangeItem(e, index, quantity){
      if (e === undefined || e.id === undefined || e.id == '')
        return false;
      const lineitems = <FormArray>this.invoiceForm.controls['line_items'];
      const currentLineItem=  <FormArray>lineitems.controls[index];
      currentLineItem.controls['quantity'].setValue(quantity);
      currentLineItem.controls['item_name'].setValue(e.name);
      currentLineItem.controls['rate'].setValue(e.unitprice);
      currentLineItem.controls['item_id'].setValue(e.id);
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
