import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-organisation',
    templateUrl: './organisation.settings.component.html',
    animations: [routerTransition()]
})
export class OrganisationSettingsComponent implements OnInit {


    constructor() {

    }

    ngOnInit() {}


}
