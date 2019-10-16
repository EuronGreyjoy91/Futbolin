import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

//ROUTING
import { APP_ROUTING } from './app.routes';
import { JugadorComponent } from './components/jugador/jugador.component';
import { ResultComponent } from './components/result/result.component';
import { JugadorFormComponent } from './components/jugador-form/jugador-form.component';

//EXTRAS
import { TooltipModule } from 'ng2-tooltip-directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoAvatarPipe } from './pipes/no-avatar.pipe';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';

//GRAFICOS
import { ChartsModule } from 'ng2-charts';
import { JugadorPartidoComponent } from './components/jugador-partido/jugador-partido.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JugadorComponent,
    ResultComponent,
    JugadorFormComponent,
    NavbarComponent,
    NoAvatarPipe,
    EstadisticasComponent,
    JugadorPartidoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
    TooltipModule,
    ChartsModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
