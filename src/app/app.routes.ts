import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'person',
        loadComponent: () => import('./person-list/person-list.component')
    },
    {
        path: '**',
        redirectTo: '/person',
        pathMatch: 'full'
    }

];
