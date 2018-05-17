import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxComponent } from './tax.component';
import { TaxAddComponent } from './tax.add.component';
import { TaxListComponent } from './tax.list.component';
import { TaxEditComponent } from './tax.edit.component';

const routes: Routes = [
    {
        path: '', component: TaxComponent,
        children: [
            { path: 'add', component: TaxAddComponent },
            { path: '', component: TaxListComponent },
            { path: 'edit/:id', component: TaxEditComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaxRoutingModule {
}
