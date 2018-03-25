import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryAddComponent } from './category.add.component';
import { CategoryListComponent } from './category.list.component';
import { PageHeaderModule, ModalModule } from './../../shared';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CategoryService } from './category.service';
import { CategoryEditComponent } from './category.edit.component';


@NgModule({
    imports: [CommonModule,
      CategoryRoutingModule,
      PageHeaderModule,
      NgxDatatableModule,
      ReactiveFormsModule,
      FormsModule,
      ModalModule,
      NgbModule.forRoot()
      ],
    declarations: [CategoryComponent, CategoryAddComponent,
       CategoryListComponent, CategoryEditComponent
     ],
    providers: [CategoryService]
})
export class CategoryModule {}
