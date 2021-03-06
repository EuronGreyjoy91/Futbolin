import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JugadorFormComponent } from './components/jugador-form/jugador-form.component';
import { ResultComponent } from './components/result/result.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'result', component: ResultComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'jugador', component: JugadorFormComponent },
  { path: 'jugador/:id', component: JugadorFormComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
