import { Routes } from '@angular/router';
import { Evaluacion } from './features/evaluacion/evaluacion';

export const routes: Routes = [
    {
    path: 'evaluacion',
    component: Evaluacion
  },
  {
    path: '**',
    redirectTo: ''
  }
];
