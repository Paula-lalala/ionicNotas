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
    path: 'editar-materia/:id',
    loadComponent: ()=> import('./agregar-materia/agregar-materia.page').then((m)=>m.AgregarMateriaPage)
  },
  {
    path: 'materia',
    loadComponent: () => import('./materia/materia.page').then( m => m.MateriaPage)
  },
  {
    path: 'notas/:id',
    loadComponent: () => import('./notas/notas.page').then( m => m.NotasPage)
  },
  {
    path: 'agregar-nota/:materiaId',
    loadComponent: () => import('./agregar-nota/agregar-nota.page').then( m => m.AgregarNotaPage)
  },
  {
    path: 'editar-nota/:materiaId/:notaId',
    loadComponent: () => import('./agregar-nota/agregar-nota.page').then((m) => m.AgregarNotaPage)
  }
];
