import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ContactsAddComponent } from './contacts.add.component';
import { ContactsListComponent } from './contacts.list.component';
import { ContactsEditComponent } from './contacts.edit.component';

const routes: Routes = [
    {
        path: '', component: ContactsComponent,
        children: [
            { path: 'add', component: ContactsAddComponent },
            { path: '', component: ContactsListComponent },
            { path: 'edit/:id', component: ContactsEditComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactsRoutingModule {
}
