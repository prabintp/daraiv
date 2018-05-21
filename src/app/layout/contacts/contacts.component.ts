import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
@Injectable()
@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    animations: [routerTransition()]
})
export class ContactsComponent implements OnInit {
    constructor() {
    }
    ngOnInit() {}
}
