import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';






@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,

  ],
  providers: [
    provideCharts(withDefaultRegisterables ())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
