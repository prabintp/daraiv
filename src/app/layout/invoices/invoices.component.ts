import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
@Injectable()
@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss'],
    animations: [routerTransition()]
})
export class InvoicesComponent implements OnInit {
    constructor() {
    }
    ngOnInit() {}
}
