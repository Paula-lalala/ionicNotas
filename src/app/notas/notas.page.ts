import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
   IonList, IonItem, IonLabel, IonItemDivider,IonSearchbar, IonButtons, IonMenuButton,AlertController, 
   IonAccordionGroup, IonAccordion } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterModule, Router,RouterLink } from '@angular/router';
import { MateriaService } from '../services/materias.service';
import { Nota, Materia } from '../models/materia';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
  standalone: true,
  imports: [IonAccordionGroup, IonItemDivider, IonButton, IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule,
  IonList,IonItem, RouterModule, IonLabel,RouterLink, IonSearchbar, IonButtons, IonMenuButton, IonAccordion ]
})
export class NotasPage implements OnInit {
  materiaId: number;
  notas: Nota[] = [];
  cortes: { [key: number]: Nota[] } = { 1: [], 2: [], 3: [], 4: [] };
  searchTerm: string = '';
  notasFiltradas: Nota[] = [];
  materia?: Materia;

  constructor(private route: ActivatedRoute, private materiaService:MateriaService, private router:Router, private alertController: AlertController) { 
    this.materiaId = +this.route.snapshot.paramMap.get('id')!;
    this.loadNotas();
  }

  

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.materiaId = +params['id'];
      console.log('Materia ID:', this.materiaId);
      this.materia = (await this.materiaService.getMaterias()).find(m => m.id === this.materiaId);      
      this.loadNotas();
      this.notasFiltradas = this.notas;
    });
  }

  async loadNotas() {
    this.notas = await this.materiaService.getNotas(this.materiaId);
    this.cortes = { 1: [], 2: [], 3: [], 4: [] };
    this.notas.forEach(nota => {
      if (nota.corte >= 1 && nota.corte <= 4) {
        this.cortes[nota.corte].push(nota);
      }
    });
  }

  async deleteNota(notaId: number) {
    const confirm = await this.mostrarAlertaConfirmacion('Confirmar eliminación', '¿Está seguro de que desea eliminar esta nota?');
    if (confirm) {
      await this.materiaService.deleteNota(this.materiaId, notaId);
      this.loadNotas();    
    }
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

  editNota(notaId: number) {
    this.router.navigate(['/editar-nota', this.materiaId, notaId]);  }

  async volver(){
    this.router.navigate(['/materia']);
  }

  filtrarNotas() {
    const term = this.searchTerm.toLowerCase();
    this.notasFiltradas = this.notas.filter(nota =>
      nota.descripcion.toLowerCase().includes(term)
    );

    this.cortes = { 1: [], 2: [], 3: [], 4: [] };
    this.notasFiltradas.forEach(nota => {
      if (nota.corte >= 1 && nota.corte <= 4) {
        this.cortes[nota.corte].push(nota);
      }
    });
  }

}
