import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, 
  IonTitle, IonToolbar,IonList,
  IonLabel,IonItem,IonButton,
  IonInput,IonGrid,IonRow,
  IonCol,IonButtons, IonMenuButton, 
  AlertController } from '@ionic/angular/standalone';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
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
    IonGrid, IonRow, FormsModule,
    IonButtons, IonMenuButton
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

  constructor(private materiaService: MateriaService, private router:Router, private route:ActivatedRoute, private alertController: AlertController) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));    if (id) {
      this.isEditMode = true;
      const materias = await this.materiaService.getMaterias();
      this.materia = materias.find(m => m.id === id) || this.materia;
    }
  }

async agregarMateria() {
      if (!this.validarCampos()) {
        alert('Por favor, llene todos los campos obligatorios.');
        await this.mostrarAlerta('Error', 'Por favor, llene todos los campos obligatorios.');
        return;
      }
      if (this.isEditMode) {
        this.materiaService.updateMateria(this.materia);
      } else {
        this.materiaService.addMateria(this.materia);
      const materiaAñadida = await this.materiaService.addMateria(this.materia);
      if (!materiaAñadida) {
        await this.mostrarAlerta('Error', 'El ID ya existe. Por favor, elija un ID diferente.');
        return;
      }
    }
      this.reiniciarForm();
  }

  validarCampos(): boolean {
      return this.materia.nombre !== '' && this.materia.semestre > 0 && this.materia.codigo > 0 && this.materia.horario !== '';
  }

  reiniciarForm(){
    this.router.navigate(['/materia']);
    this.materia = { id: 0, nombre: '', semestre: 0, codigo: 0, horario: '', observaciones: '' };
  }

  clearMateria(){
    this.materiaService.clearMaterias()
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
