import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { UniqueInvoiceValidatorDirective} from './invoices/invoices-id-uniqe.directive';
// import { ModalComponent} from './bs-component/components';



@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NguiAutoCompleteModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [LayoutComponent, SidebarComponent,
      HeaderComponent,
      UniqueInvoiceValidatorDirective]
})
export class LayoutModule {}
