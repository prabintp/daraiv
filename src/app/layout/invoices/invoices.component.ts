import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {Router, RouterModule} from '@angular/router';
@Injectable()
@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss'],
    animations: [routerTransition()]
})
export class InvoicesComponent implements OnInit {
    public docType: string;
    constructor(private router: Router) {
        this.docType = this.router.routerState.snapshot.url.split('/')[1];
    }
    ngOnInit() {}
}
