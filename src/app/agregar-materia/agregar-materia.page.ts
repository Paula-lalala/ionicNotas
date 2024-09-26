import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, 
  IonTitle, IonToolbar,IonList,
  IonLabel,IonItem,IonButton,
  IonInput,IonGrid,IonRow,
  IonCol } from '@ionic/angular/standalone';
import { RouterModule, Router, Route, ActivatedRoute } from '@angular/router';
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
export class AgregarMateriaPage implements OnInit{
  materia: Materia = {
    id: 0,
    nombre: '',
    semestre: 0,
    codigo: 0,
    horario: '',
    observaciones: ''
  };

  isEditMode = false;

  constructor(private materiaService: MateriaService, private router:Router, private route:ActivatedRoute) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));    if (id) {
      this.isEditMode = true;
      const materias = await this.materiaService.getMaterias();
      this.materia = materias.find(m => m.id === id) || this.materia;
    }
  }

  agregarMateria() {
    if (this.isEditMode) {
      this.materiaService.updateMateria(this.materia);
    } else {
      this.materiaService.addMateria(this.materia);
    }
    this.reiniciarForm();  }

  reiniciarForm(){
    this.router.navigate(['/materia']);
    this.materia = { id: 0, nombre: '', semestre: 0, codigo: 0, horario: '', observaciones: '' };
  }

  clearMateria(){
    this.materiaService.clearMaterias()
  }
}
