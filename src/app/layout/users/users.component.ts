import { Injectable } from '@angular/core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { UsersService } from './users.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [routerTransition()]
})
export class UsersComponent implements OnInit {
    public rows: any = [];
    columns = [];
    loading: boolean = false;
    @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
    @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
    constructor(private usersService: UsersService) {
        this.loading = true;
        this.usersService.getUsers().subscribe(
          res => res.status === 200 || res.status === 304 ? this.rows = res.json().rows : this.rows = []
      );

    }
    ngOnInit() {

      this.columns = [
        {
          cellTemplate: this.editTmpl,
          headerTemplate: this.hdrTpl,
          name: 'picture'
        },
        { prop: 'name' },
        { name: 'email' }
      ];

    }



}
