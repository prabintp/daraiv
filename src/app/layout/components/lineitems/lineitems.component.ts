import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'lineitems',
    templateUrl: './lineitems.component.html',
    styleUrls: ['./lineitems.component.scss']
})
export class LineitemsComponent {

    @Input('group')
    public adressForm: FormGroup;
    constructor() {

    }


}
