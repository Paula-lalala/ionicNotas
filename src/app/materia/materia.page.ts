import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,
IonList, IonItem, IonButton, IonLabel, IonSearchbar,IonMenu,
IonButtons, IonMenuButton, AlertController } from '@ionic/angular/standalone';
import { MateriaService } from '../services/materias.service';
import { Materia } from '../models/materia';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-materia',
  templateUrl: './materia.page.html',
  styleUrls: ['./materia.page.scss'],
  standalone: true,
  imports: [IonLabel, IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule,
    IonItem, IonList, IonButton, IonSearchbar,IonMenu, MenuComponent,
    IonButtons, IonMenuButton]
  })
  export class MateriaPage implements OnInit, OnDestroy{
    materias: Materia[] = [];
    subscription: Subscription = new Subscription;
    estados: string[] = [];
    searchTerm: string = '';
    materiasFiltradas: Materia[] = [];
    
  
    constructor(private materiaService: MateriaService, private router:Router, private alertController: AlertController) {
    }

    ngOnInit() {
      this.materiaService.materias$.subscribe(async (materias) => {
        this.materias = materias;
        this.materiasFiltradas = this.materias;
        if (this.estados.length === 0 || this.estados.length !== materias.length) {
          this.estados = await Promise.all(materias.map(materia => 
            this.materiaService.verificarEstadoMateria(materia.id)
          ));
        }
      });
    }
  
    filtrarMaterias() {
      const term = this.searchTerm.toLowerCase();
      this.materiasFiltradas = this.materias.filter(materia => 
        materia.nombre.toLowerCase().includes(term) ||
        (materia.notas && materia.notas.some(nota => nota.descripcion.toLowerCase().includes(term)))
      );
    }
  
    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

    async crearMateria(){
      this.router.navigate(['/agregar-materia']);    }

      async eliminarMateria(id: number) {
        const notas = await this.materiaService.getNotas(id);
        if (notas.length > 0) {
          await this.mostrarAlerta('Error', 'No puede eliminar esta materia debido a que hay notas registradas.');
          return;
        }
        const confirm = await this.mostrarAlertaConfirmacion('Confirmar eliminación', '¿Está seguro de que desea eliminar esta materia?');
        if (confirm) {
          await this.materiaService.deleteMateria(id);
          this.materias = await this.materiaService.getMaterias(); 
          this.materiasFiltradas = this.materias;
        }
      }

    async editarMateria(id:number){
      this.router.navigate(['/editar-materia', id]);    
    }

    async mostrarAlerta(header: string, message: string) {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: ['OK']
      });
      await alert.present();
    }
      async mostrarAlertaConfirmacion(header: string, message: string): Promise<boolean> {
      return new Promise(async (resolve) => {
        const alert = await this.alertController.create({
          header,
          message,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => resolve(false)
            },
            {
              text: 'Eliminar',
              handler: () => resolve(true)
            }
          ]
        });
  
        await alert.present();
      });
    }

    async irNotas(id:number){
      this.router.navigate(['/notas', id]);
    }
    
  }
