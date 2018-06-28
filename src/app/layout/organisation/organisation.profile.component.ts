import { Component, OnInit, Injectable, Input } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Injectable()
@Component({
    selector: 'app-organisation',
    templateUrl: './organisation.profile.component.html',
    animations: [routerTransition()]
})
export class OrganisationProfileComponent implements OnInit {

    @Input() organisationdata;
    constructor() {

    }

    ngOnInit() {}


}
