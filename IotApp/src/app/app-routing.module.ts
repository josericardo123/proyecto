import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EcDispComponent } from './dispositivos/ec-disp/ec-disp.component';
import { EcIotComponent } from './dispositivos/ec-iot/ec-iot.component';

const routes: Routes = [
  {path: '', component: EcIotComponent},
  {path: 'create', component: EcDispComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
