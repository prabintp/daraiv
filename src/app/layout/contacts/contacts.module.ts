import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactsAddComponent } from './contacts.add.component';
import { ContactsListComponent } from './contacts.list.component';
import { PageHeaderModule, ModalModule } from './../../shared';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { ContactsService } from './contacts.service';
import { CategoryService } from '../category/category.service';
import { ContactsEditComponent } from './contacts.edit.component';


@NgModule({
    imports: [CommonModule, ContactsRoutingModule,
       PageHeaderModule, NgxDatatableModule,
      FormsModule, ReactiveFormsModule, ModalModule,
      NguiAutoCompleteModule,
      NgbModule.forRoot()],
    declarations: [ContactsComponent, ContactsAddComponent,
      ContactsListComponent, ContactsEditComponent],
    providers: [ContactsService, CategoryService]
})
export class ContactsModule {}
