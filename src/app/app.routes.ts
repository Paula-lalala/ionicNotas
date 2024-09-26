import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'agregar-materia',
    loadComponent:() => import('./agregar-materia/agregar-materia.page').then((m)=>m.AgregarMateriaPage)
  },
  {
    path: 'materia',
    loadComponent: () => import('./materia/materia.page').then( m => m.MateriaPage)
  }
];
