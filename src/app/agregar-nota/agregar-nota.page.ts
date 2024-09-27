import { Component, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, 
  IonToolbar, IonItem, IonLabel, IonButton, IonInput } from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';
import { MateriaService } from '../services/materias.service';
import { Nota } from '../models/materia';

@Component({
  selector: 'app-agregar-nota',
  templateUrl: './agregar-nota.page.html',
  styleUrls: ['./agregar-nota.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule,
  IonButton, IonItem, IonLabel, IonInput],
})
export class AgregarNotaPage {
  materiaId!: number;
  nota: Nota = {
    id: 0,
    fechaEntrega: '',
    descripcion: '',
    nota: 0,
    observaciones: ''
  };

  constructor(private materiaService: MateriaService,private router: Router,private route: ActivatedRoute) {
    this.materiaId = +this.route.snapshot.paramMap.get('id')!;
  }

  async agregarNota() {
    this.nota.nota = Math.max(0, Math.min(this.nota.nota || 0, 5));
  
    await this.materiaService.addNota(this.materiaId, this.nota);
    this.router.navigate(['/notas', this.materiaId]);
  }

  async volver(){
    this.router.navigate(['/nota']);
  }
  
}
