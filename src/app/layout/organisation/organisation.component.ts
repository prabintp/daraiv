import { Component } from '@angular/core';
import { routerTransition } from '../../router.animations';


@Component({
    selector: 'app-organisation',
    templateUrl: './organisation.component.html',
    styleUrls: ['./organisation.component.scss'],
    animations: [routerTransition()]
})
export class OrganisationComponent {

    constructor() {}
}
