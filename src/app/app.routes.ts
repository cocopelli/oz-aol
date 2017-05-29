import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {editRoutes} from './EditView/routes/edit.routes';
import {listRoutes} from './ListView/routes/list.routes';
import {songRoutes} from './SongView/routes/song.routes';



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
  ...editRoutes,
  ...songRoutes
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
