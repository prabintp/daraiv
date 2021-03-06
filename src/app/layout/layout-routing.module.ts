import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'organisation', loadChildren: './organisation/organisation.module#OrganisationModule' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'items', loadChildren: './items/items.module#ItemsModule' },
            { path: 'invoices', loadChildren: './invoices/invoices.module#InvoicesModule' },
            { path: 'salesorders', loadChildren: './invoices/invoices.module#InvoicesModule' },
            { path: 'purchaseorders', loadChildren: './invoices/invoices.module#InvoicesModule' },
            { path: 'category', loadChildren: './category/category.module#CategoryModule' },
            { path: 'tax', loadChildren: './tax/tax.module#TaxModule' },
            { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsModule' },
          //  { path: 'items/add', loadChildren: './users/users.module#UsersModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
