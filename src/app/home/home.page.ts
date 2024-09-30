import { Component } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonButton,IonLabel, IonButtons, IonMenuButton } from '@ionic/angular/standalone';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, 
    IonButton, IonItem, IonLabel, IonButtons, RouterModule, IonMenuButton],
})
export class HomePage {
  constructor(private router: Router) {}

  irAMaterias() {
    this.router.navigate(['/materia']);
  }
}
