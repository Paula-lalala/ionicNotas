import { Component, NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, 
  IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonSelectOption,IonBackdrop,IonSelect, IonButtons,IonMenuButton } from '@ionic/angular/standalone';
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
  IonButton, IonItem, IonLabel, IonInput,
IonSelectOption, IonBackdrop,IonSelect, IonButtons, IonMenuButton],
})
export class AgregarNotaPage implements OnInit{
  materiaId!: number;
  notaId: number;
  nota: Nota = {
    id: 0,
    fechaEntrega: '',
    descripcion: '',
    nota: 0,
    observaciones: '',
    corte:1
  };
  isEditing = false;

  constructor(private materiaService: MateriaService, private router: Router, private route: ActivatedRoute) {
    this.materiaId = +this.route.snapshot.paramMap.get('materiaId')!;
    this.notaId = +this.route.snapshot.paramMap.get('notaId')!;
  }

  ngOnInit(): void {
    if (this.notaId) {
      this.isEditing = true;
      this.loadNota(this.notaId);
    }
  }

  async loadNota(notaId: number) {
    const notas = await this.materiaService.getNotas(this.materiaId);
    const nota = notas.find(n => n.id === notaId);
    if (nota) {
      this.nota = { ...nota };
    }
  }

  async saveNota() {
    console.log('Guardando Nota:', this.nota);
    if (this.isEditing) {
      await this.materiaService.updateNota(this.materiaId, this.nota);
    } else {
      await this.materiaService.addNota(this.materiaId, this.nota);
    }
    this.router.navigate(['/notas', this.materiaId]);
  }

  async volver() {
    this.router.navigate(['/notas', this.materiaId]);
  }
}
