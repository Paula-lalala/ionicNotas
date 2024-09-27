import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
   IonList, IonItem, IonLabel
 } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MateriaService } from '../services/materias.service';
import { Nota } from '../models/materia';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule,
  IonList,IonItem, RouterModule, IonLabel]
})
export class NotasPage implements OnInit {
  materiaId: number;
  notas: Nota[] = [];

  constructor(private route: ActivatedRoute, private materiaService:MateriaService, private router:Router) { 
    this.materiaId = +this.route.snapshot.paramMap.get('id')!;
    this.loadNotas();
  }

  ngOnInit() {
    this.materiaId = +this.route.snapshot.paramMap.get('id')!;
    this.loadNotas();
    this.materiaService.materias$.subscribe(() => {
      this.loadNotas();
    });
  }

  async loadNotas() {
    this.notas = await this.materiaService.getNotas(this.materiaId);
  }

  async deleteNota(notaId: number) {
    await this.materiaService.deleteNota(this.materiaId, notaId);
    this.loadNotas();
  }

  async volver(){
    this.router.navigate(['/materia']);
  }

}
