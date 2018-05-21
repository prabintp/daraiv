import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { ContactsService } from './contacts.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.add.component.html',
    styleUrls: ['./contacts.component.scss'],
    animations: [routerTransition()]
})
export class ContactsAddComponent implements OnInit {
  public contactsForm: FormGroup;
  private rows: any = [];
  public listCategory = [];
  contactsdata = {
    notes: '',
    desc: '',
    name: '',
    access_token: '',
    shop: '',
    createdBy: '',
  };
    constructor(
      private _fb: FormBuilder,
      private contactsService: ContactsService,
      private router: Router) {
    }
    ngOnInit() {
      this.initForm();
    }




   autocompleContacts = (data: any) : any => {
     let html = `<span>${data.name}</span>`;
     return html;
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

    onSubmit(){
      this.contactsService.addContacts(this.contactsForm.value).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/contacts']) : this.router.navigate(['/404'])
     );
    }



}
