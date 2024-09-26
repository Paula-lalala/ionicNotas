import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,
IonList, IonItem, IonButton } from '@ionic/angular/standalone';
import { MateriaService } from '../services/materias.service';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.page.html',
  styleUrls: ['./materia.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule,
    IonItem, IonList, IonButton]
  })
  export class MateriaPage implements OnInit{
    materias: Materia[] = [];
  
    constructor(private materiaService: MateriaService) {
    }

  async ngOnInit() {
    await this.cargarMateria();
  }

    async cargarMateria(){  
      this.materias = await this.materiaService.getMaterias();
      console.log(this.materias)
    }
  }
