import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { OrganisationRoutingModule } from './organisation-routing.module';
import { OrganisationComponent } from './organisation.component';
import { OrganisationProfileComponent } from './organisation.profile.component';
import { OrganisationSettingsComponent } from './organisation.settings.component';
import { OrganisationService } from './organisation.service';


@NgModule({
    imports: [
        OrganisationRoutingModule,
        NgbModule.forRoot()
    ],
    declarations: [
        OrganisationComponent,
        OrganisationProfileComponent,
        OrganisationSettingsComponent
    ],
    providers: [OrganisationService]
})
export class OrganisationModule {}
