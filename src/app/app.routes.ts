import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/HomePage/HomePage.component';

export const routes: Routes = [
  {
    path: '',
    component:HomePageComponent,
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes'),
  },
  {
    path: '**', //para que redireccione todos los paths mal indicados a uno en especifico
    redirectTo: '',
  }
];
