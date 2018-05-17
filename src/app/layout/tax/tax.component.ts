import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
@Injectable()
@Component({
    selector: 'app-tax',
    templateUrl: './tax.component.html',
  //  styleUrls: ['./category.component.scss'],
    animations: [routerTransition()]
})
export class TaxComponent implements OnInit {
    constructor() {
    }
    ngOnInit() {}
}
