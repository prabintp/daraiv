import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { ItemsAddComponent } from './items.add.component';
import { ItemsListComponent } from './items.list.component';
import { PageHeaderModule, ModalModule } from './../../shared';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { ItemsService } from './items.service';
import { CategoryService } from '../category/category.service';
import { ItemsEditComponent } from './items.edit.component';


@NgModule({
    imports: [CommonModule, ItemsRoutingModule,
       PageHeaderModule, NgxDatatableModule,
      FormsModule, ReactiveFormsModule, ModalModule,
      NguiAutoCompleteModule,
      NgbModule.forRoot()],
    declarations: [ItemsComponent, ItemsAddComponent,
      ItemsListComponent, ItemsEditComponent],
    providers: [ItemsService, CategoryService]
})
export class ItemsModule {}
