import { Injectable } from '@angular/core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { routerTransition } from '../../router.animations';
import { ContactsService } from './contacts.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.list.component.html',
    styleUrls: ['./contacts.component.scss'],
    animations: [routerTransition()]
})
export class ContactsListComponent implements OnInit {
    public rows: any = [];
    temp = [];
    columns = [];
    loading: boolean = false;
    @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
    @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
    @ViewChild('categoryTmpl') categoryTmpl: TemplateRef<any>;
    constructor(private contactsService: ContactsService, private router: Router) {
        this.loading = true;
        this.contactsService.getContacts().subscribe(
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
        {
          cellTemplate: this.categoryTmpl,
          name: 'type'
        },
        { prop: 'name' },
        { name: 'company' },
        {
          name: 'email' },
        { name: 'phone' },
        {
          cellTemplate: this.editTmpl,
          headerTemplate: this.hdrTpl,
          name: 'id'
        },
      ];

    }

    onDelete(id){
      this.contactsService.deleteItem(id).subscribe(
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

    if(field == 'name'){
      const temp = this.temp.filter(function(d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val ;
      });
      this.rows = temp;
    }else {
      const temp = this.temp.filter(function(d) {
        return d.type.toLowerCase().indexOf(val) !== -1 || !val ;
      });
      this.rows = temp;
    }
  }



}
