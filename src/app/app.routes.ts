import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { SaleComponent } from './components/sale/sale.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'products',
        component: ProductComponent
    },
    {
        path: 'sales',
        component: SaleComponent
    }
];
