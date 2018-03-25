import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoryAddComponent } from './category.add.component';
import { CategoryListComponent } from './category.list.component';
import { CategoryEditComponent } from './category.edit.component';

const routes: Routes = [
    {
        path: '', component: CategoryComponent,
        children: [
            { path: 'add', component: CategoryAddComponent },
            { path: '', component: CategoryListComponent },
            { path: 'edit/:id', component: CategoryEditComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule {
}
