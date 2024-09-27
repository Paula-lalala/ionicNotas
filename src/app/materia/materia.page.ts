import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,
IonList, IonItem, IonButton } from '@ionic/angular/standalone';
import { MateriaService } from '../services/materias.service';
import { Materia } from '../models/materia';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-materia',
  templateUrl: './materia.page.html',
  styleUrls: ['./materia.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule,
    IonItem, IonList, IonButton]
  })
  export class MateriaPage implements OnInit, OnDestroy{
    materias: Materia[] = [];
    subscription: Subscription = new Subscription;
  
    constructor(private materiaService: MateriaService, private router:Router) {
    }

    ngOnInit() {
      this.subscription = this.materiaService.materias$.subscribe(
        (materias) => {
          this.materias = materias;
        }
      );
    }
  
    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

    async crearMateria(){
      this.router.navigate(['/agregar-materia']);    }

    async eliminarMateria(id:number){
      await this.materiaService.deleteMateria(id);
      this.materias = await this.materiaService.getMaterias();
    }

    async editarMateria(id:number){
      this.router.navigate(['/editar-materia', id]);    
    }

    async irNotas(id:number){
      this.router.navigate(['/notas', id]);
    }

    
  }
