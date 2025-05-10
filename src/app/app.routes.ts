import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'products',
        component: ProductComponent
    }
];
