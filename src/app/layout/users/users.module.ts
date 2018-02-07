import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { PageHeaderModule } from './../../shared';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UsersService } from './users.service';

@NgModule({
    imports: [CommonModule, UsersRoutingModule, PageHeaderModule, NgxDatatableModule],
    declarations: [UsersComponent],
    providers: [UsersService]
})
export class UsersModule {}
