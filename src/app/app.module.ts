import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

//ROUTING
import { APP_ROUTING } from './app.routes';
import { JugadorComponent } from './components/jugador/jugador.component';
import { ResultComponent } from './components/result/result.component';
import { JugadorFormComponent } from './components/jugador-form/jugador-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JugadorComponent,
    ResultComponent,
    JugadorFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
