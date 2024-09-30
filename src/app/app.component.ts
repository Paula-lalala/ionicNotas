import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader } from '@ionic/angular/standalone';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonHeader, IonApp, IonRouterOutlet, MenuComponent],
})
export class AppComponent {
  constructor() {}
}
