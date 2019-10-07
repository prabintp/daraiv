import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { AccountsAddComponent } from './accounts.add.component';
import { AccountsListComponent } from './accounts.list.component';
import { PageHeaderModule, ModalModule } from '../../shared';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AccountsService } from './accounts.service';
import { AccountsEditComponent } from './accounts.edit.component';


@NgModule({
    imports: [CommonModule,
      AccountsRoutingModule,
      PageHeaderModule,
      NgxDatatableModule,
      ReactiveFormsModule,
      FormsModule,
      ModalModule,
      NgbModule.forRoot()
      ],
    declarations: [AccountsComponent, AccountsAddComponent,
       AccountsListComponent, AccountsEditComponent
     ],
    providers: [AccountsService]
})
export class AccountsModule {}
