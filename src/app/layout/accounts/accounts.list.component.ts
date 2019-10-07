import { Injectable } from '@angular/core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { routerTransition } from '../../router.animations';
import { AccountsService } from './accounts.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.list.component.html',
  //  styleUrls: ['./accounts.component.scss'],
    animations: [routerTransition()]
})
export class AccountsListComponent implements OnInit {s
    public rows: any = [];
    temp = [];
    columns = [];
    loading: boolean = false;
    @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
    @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
    @ViewChild('accountTypeTmpl') accountTypeTmpl: TemplateRef<any>;
    constructor(private accountsService: AccountsService, private router: Router) {
        this.loading = true;
        this.accountsService.getAccounts().subscribe(
          res => { if (res.status === 200 || res.status === 304) {
            let resdata = res.json().rows;
            this.rows = res.json().rows;
            this.temp = [...resdata];
            console.log(this.temp);
         }
        else{
           this.rows = []
         }
       }
      );

    }
    ngOnInit() {

      this.columns = [
        { prop: 'name' },
        {
          cellTemplate: this.accountTypeTmpl,
          name: 'Account Type',
          prop: 'accounttype'
        },
        {
          cellTemplate: this.editTmpl,
          headerTemplate: this.hdrTpl,
          name: 'id'
        },
      ];

    }

    onDelete(id){
      this.accountsService.deleteItem(id).subscribe(
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
    }
  }



}
