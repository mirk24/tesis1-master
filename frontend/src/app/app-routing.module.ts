import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from "./componentes/inicio/inicio.component";
import {EstacionComponent} from "./componentes/estacion/estacion.component";

const routes:Routes=[
  {
    path:'inicio',component:InicioComponent
  },
  {
    path:'estacion',component:EstacionComponent
  },
  {
    path:'',pathMatch:'full',redirectTo:'inicio'
  },
];


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
