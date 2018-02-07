import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items.component';
import { ItemsAddComponent } from './items.add.component';
import { ItemsListComponent } from './items.list.component';
import { ItemsEditComponent } from './items.edit.component';

const routes: Routes = [
    {
        path: '', component: ItemsComponent,
        children: [
            { path: 'add', component: ItemsAddComponent },
            { path: '', component: ItemsListComponent },
            { path: 'edit/:id', component: ItemsEditComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemsRoutingModule {
}
