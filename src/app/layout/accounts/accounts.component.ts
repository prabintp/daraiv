import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
@Injectable()
@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
  //  styleUrls: ['./category.component.scss'],
    animations: [routerTransition()]
})
export class AccountsComponent implements OnInit {
    constructor() {
    }
    ngOnInit() {}
}
