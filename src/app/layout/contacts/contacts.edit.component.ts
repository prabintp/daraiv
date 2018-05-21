import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { ContactsService } from './contacts.service';
import { CategoryService } from '../category/category.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.add.component.html',
  //  styleUrls: ['./contacts.component.scss'],
    animations: [routerTransition()]
})
export class ContactsEditComponent implements OnInit {
  public contactsForm: FormGroup;
  private rows: any = [];
  public listCategory = [];
  currentItemID: any;
  contactsdata = {
    notes: '',
    type: '',
    email: '',
    company: '',
    shop: '',
    createdBy: '',
    phone:'',
    mobile:'',
    baddress: '',
    saddress: '',
    name:''
  };
    constructor(
      private _fb: FormBuilder,
      private contactsService: ContactsService,
      private _categoryService: CategoryService,
      private router: Router,
      private route: ActivatedRoute) {
    }
    ngOnInit() {
      this.initForm();
      this.currentItemID = this.route.snapshot.params['id'];
      this.getContacts(this.currentItemID);
    }


    initForm(){
      this.contactsForm = this._fb.group({
        name: ['', [Validators.required]],
        type: ['v', [Validators.required]],
        email: ['', [Validators.required]],
        company: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        mobile:[''],
        baddress:[''],
        saddress:['']

       });
    }

    private patchForm() {
      this.contactsForm.patchValue(this.contactsdata);
    /*  this.contactsForm.setValue({
        name: this.contactsdata.name,
        type: this.contactsdata.type,
        email: this.contactsdata.email,
        company: this.contactsdata.company,
        phone: this.contactsdata.phone,
        mobile: this.contactsdata.mobile,
        baddress: this.contactsdata.baddress || '',
        shop: this.contactsdata.shop,
        saddress: this.contactsdata.saddress || '',
        createdBy: this.contactsdata.createdBy || ''
      });*/
    }

    getContacts(id) {
      this.contactsService.getContactsByID(id).subscribe(
        res => { if (res.status === 200 || res.status === 304) {
        //  let resdata = res.json().rows;
          this.contactsdata = res.json();
          this.patchForm();
       }
      else{
        // this.contactsdata = []
       }
     }

     );
   }

    onSubmit(){
      this.contactsService.editContacts(this.contactsForm.value, this.currentItemID).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/contacts']) : this.router.navigate(['/404'])
     );
    }



}
