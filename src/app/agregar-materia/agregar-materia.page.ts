import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, 
  IonTitle, IonToolbar,IonList,
  IonLabel,IonItem,IonButton,
  IonInput,IonGrid,IonRow,
  IonCol } from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';
import { MateriaService } from '../services/materias.service';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-agregar-materia',
  templateUrl: './agregar-materia.page.html',
  styleUrls: ['./agregar-materia.page.scss'],
  standalone: true,
  imports: [IonContent, 
    IonHeader,IonTitle,IonToolbar, 
    CommonModule,RouterModule,
    IonList,IonItem,IonLabel, 
    IonButton, IonInput, IonCol, 
    IonGrid, IonRow, FormsModule
]
})
export class AgregarMateriaPage {
  materia: Materia = {
    id: 0,
    nombre: '',
    semestre: 0,
    codigo: 0,
    horario: '',
    observaciones: ''
  };

  constructor(private materiaService: MateriaService, private router:Router) {}

  agregarMateria() {
    this.materiaService.addMateria(this.materia);
    console.log(this.materia)
    this.router.navigate(['/materia'])
    this.materia = { id: 0, nombre: '', semestre: 0, codigo: 0, horario: '', observaciones: '' };
  }

  clearMateria(){
    this.materiaService.clearMaterias()
  }
}
