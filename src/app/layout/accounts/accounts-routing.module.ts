import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { AccountsAddComponent } from './accounts.add.component';
import { AccountsListComponent } from './accounts.list.component';
import { AccountsEditComponent } from './accounts.edit.component';

const routes: Routes = [
    {
        path: '', component: AccountsComponent,
        children: [
            { path: 'add', component: AccountsAddComponent },
            { path: '', component: AccountsListComponent },
            { path: 'edit/:id', component: AccountsEditComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountsRoutingModule {
}
