import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { InvoicesAddComponent } from './invoices.add.component';
import { InvoicesListComponent } from './invoices.list.component';
import { InvoicesEditComponent } from './invoices.edit.component';


const routes: Routes = [
    {
        path: '', component: InvoicesComponent,
        children: [
            { path: 'add', component: InvoicesAddComponent },
            { path: '', component: InvoicesListComponent },
            { path: 'edit/:id', component: InvoicesEditComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoicesRoutingModule {
}
