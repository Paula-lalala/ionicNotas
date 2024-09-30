import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
  IonList, IonItem, IonLabel,IonSearchbar,IonMenu,IonRouterOutlet,IonApp,IonMenuButton,IonButtons,IonBackdrop,MenuController} from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone:true,
  imports:[IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
    IonList, IonItem, IonLabel,IonSearchbar,IonMenu, IonRouterOutlet,IonApp,
    IonMenuButton,IonButtons,IonBackdrop]
})
export class MenuComponent {

  constructor(private router: Router, private menuCtrl: MenuController) { }

  irAMaterias() {
    this.router.navigate(['/materia']);
    this.menuCtrl.close('main-menu');
  }

  irAgregarMateria() {
    this.router.navigate(['/agregar-materia']);
    this.menuCtrl.close('main-menu');
  }
}
