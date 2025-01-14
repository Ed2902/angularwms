import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs-operacion',
  standalone: false,
  templateUrl: './tabs-operacion.component.html',
  styleUrls: ['./tabs-operacion.component.css'],
})
export class TabsOperacionComponent {
  selectedTab: string = 'tab1';  // Ahora apunta a la nueva pestaña "Órdenes de Trabajo"

  selectTab(tabId: string) {
    this.selectedTab = tabId;
  }
}
