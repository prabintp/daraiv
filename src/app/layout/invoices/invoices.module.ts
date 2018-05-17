import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { InvoicesAddComponent } from './invoices.add.component';
import { InvoicesListComponent } from './invoices.list.component';
import { PageHeaderModule, ModalModule } from './../../shared';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InvoicesService } from './invoices.service';
import { InvoicesEditComponent } from './invoices.edit.component';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemsService } from '../items/items.service';
import { TaxService } from '../tax/tax.service';

import { LineitemsComponent } from '../components/lineitems/lineitems.component';


@NgModule({
    imports: [CommonModule, InvoicesRoutingModule,NgbModule.forRoot(),
       PageHeaderModule, NgxDatatableModule,ReactiveFormsModule,
       ModalModule,
        FormsModule, NguiAutoCompleteModule],
    declarations: [InvoicesComponent, InvoicesAddComponent,
      InvoicesListComponent, InvoicesEditComponent, LineitemsComponent],
    providers: [InvoicesService, ItemsService, TaxService]
})
export class InvoicesModule {}
