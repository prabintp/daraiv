import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ItemsService } from './items.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-items',
    templateUrl: './items.add.component.html',
    styleUrls: ['./items.component.scss'],
    animations: [routerTransition()]
})
export class ItemsAddComponent implements OnInit {
  private rows: any = [];
  itemsdata = {
    notes: '',
    desc: '',
    name: '',
    access_token: '',
    shop: '',
    createdBy: '',
  };
    constructor(private itemsService: ItemsService, private router: Router) {
    }
    ngOnInit() {}

    onAdd(){
      this.itemsService.addItems(this.itemsdata).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/items']) : this.router.navigate(['/404'])
     );
    }



}
