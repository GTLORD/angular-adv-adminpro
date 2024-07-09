import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  private sideService = inject(SidebarService);
  menuItems: any[] = [];
  constructor(){
    this.menuItems = this.sideService.menu;
    console.log(this.menuItems);

  }


}
