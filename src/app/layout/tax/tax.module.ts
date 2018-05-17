import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { TaxRoutingModule } from './tax-routing.module';
import { TaxComponent } from './tax.component';
import { TaxAddComponent } from './tax.add.component';
import { TaxListComponent } from './tax.list.component';
import { PageHeaderModule, ModalModule } from './../../shared';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TaxService } from './tax.service';
import { TaxEditComponent } from './tax.edit.component';


@NgModule({
    imports: [CommonModule,
      TaxRoutingModule,
      PageHeaderModule,
      NgxDatatableModule,
      ReactiveFormsModule,
      FormsModule,
      ModalModule,
      NgbModule.forRoot()
      ],
    declarations: [TaxComponent, TaxAddComponent,
       TaxListComponent, TaxEditComponent
     ],
    providers: [TaxService]
})
export class TaxModule {}
