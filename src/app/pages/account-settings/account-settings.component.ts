import { Component,  OnInit, inject } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: ``
})
export class AccountSettingsComponent implements OnInit{

  public settingsService = inject (SettingsService);

  constructor (){}


  ngOnInit(): void {

    this.settingsService.checkCurrentTheme();
  }

  changeTheme(theme: string){
    this.settingsService.changeTheme( theme );

  }



}
