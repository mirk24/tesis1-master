import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { ButtonsComponent } from './buttons/buttons.component';

import { GridComponent } from './grid/grid.component';
import { ListsComponent } from './lists/lists.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import {
  DialogComponent,
  DialogOverviewExampleDialogComponent
} from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormulariousuarioComponent } from './usuarios/formulariousuario/formulariousuario.component';
import { EstacionComponent } from './estacion/estacion.component';
import { FormularioestacionComponent } from './estacion/formularioestacion/formularioestacion.component';
import { MonitoreosComponent } from './monitoreos/monitoreos.component';
import { FormulariomonitoreosComponent } from './monitoreos/formulariomonitoreos/formulariomonitoreos.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MedicionComponent } from './medicion/medicion.component';
import { VentasComponent } from './ventas/ventas.component';
import { CombustibleComponent } from './combustible/combustible.component';
import { FormulariocombustibleComponent } from './combustible/formulariocombustible/formulariocombustible.component';
const config: SocketIoConfig = { url: 'http://localhost:3800', options: {} };
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  entryComponents: [
    DialogOverviewExampleDialogComponent,
    FormulariousuarioComponent,
    FormularioestacionComponent,
    FormulariomonitoreosComponent,
    FormulariocombustibleComponent,
  ],
  declarations: [
    ButtonsComponent,
    GridComponent,
    ListsComponent,
    MenuComponent,
    TabsComponent,

    StepperComponent,
    ExpansionComponent,
    ChipsComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    ProgressComponent,
    DialogComponent,
    DialogOverviewExampleDialogComponent,
    TooltipComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    UsuariosComponent,
    FormulariousuarioComponent,
    EstacionComponent,
    FormularioestacionComponent,
    MonitoreosComponent,
    FormulariomonitoreosComponent,
    MedicionComponent,
    VentasComponent,
    CombustibleComponent,
    FormulariocombustibleComponent
  ]
})
export class MaterialComponentsModule {}
