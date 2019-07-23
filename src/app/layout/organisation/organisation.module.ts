import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { OrganisationRoutingModule } from './organisation-routing.module';
import { OrganisationComponent } from './organisation.component';
import { OrganisationProfileComponent } from './organisation.profile.component';
import { OrganisationSettingsComponent } from './organisation.settings.component';
import { OrganisationService } from './organisation.service';
import { ImageUploadModule } from 'angular2-image-upload';


@NgModule({
    imports: [
        OrganisationRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule.forRoot(),
        ImageUploadModule.forRoot(),
    ],
    declarations: [
        OrganisationComponent,
        OrganisationProfileComponent,
        OrganisationSettingsComponent
    ],
    providers: [OrganisationService]
})
export class OrganisationModule {}
