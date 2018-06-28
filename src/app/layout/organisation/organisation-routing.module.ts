import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganisationComponent } from './organisation.component';
import { OrganisationProfileComponent } from './organisation.profile.component';
import { OrganisationSettingsComponent } from './organisation.settings.component';

const routes: Routes = [
  {
      path: '', component: OrganisationComponent,
      children: [
          { path: '', component: OrganisationProfileComponent },
          { path: 'settings', component: OrganisationSettingsComponent }
      ]
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrganisationRoutingModule {
}
