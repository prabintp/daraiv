import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ItemsService } from './items.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
@Component({
    selector: 'app-items',
    templateUrl: './items.edit.component.html',
  //  styleUrls: ['./items.component.scss'],
    animations: [routerTransition()]
})
export class ItemsEditComponent implements OnInit {
  private rows: any = [];
  currentItemID: any;
  itemsdata = {
    notes: '',
    desc: '',
    name: '',
    access_token: '',
    shop: '',
    createdBy: '',
  };
    constructor(private itemsService: ItemsService, private router: Router, private route: ActivatedRoute) {
    }
    ngOnInit() {
      this.currentItemID = this.route.snapshot.params['id'];
      this.getItems(this.currentItemID);
    }


    getItems(id) {
      this.itemsService.getItemsByID(id).subscribe(
        res => { if (res.status === 200 || res.status === 304) {
        //  let resdata = res.json().rows;
          this.itemsdata = res.json();
       }
      else{
        // this.itemsdata = []
       }
     }

     );
   }
    onEdit(){
      this.itemsService.editItems(this.itemsdata, this.currentItemID).subscribe(
        res => res.status === 200 || res.status === 201 ? this.router.navigate(['/items']) : this.router.navigate(['/404'])
     );
    }



}
