import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {editRoutes} from './EditView/routes/edit.routes';
import {listRoutes} from './ListView/routes/list.routes';



export const routes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  // {
  //   path: '**',
  //   redirectTo: '/list'
  // },
  ...listRoutes,
  ...editRoutes
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
