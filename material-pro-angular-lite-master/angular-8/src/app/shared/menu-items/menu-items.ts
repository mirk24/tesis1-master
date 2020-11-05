import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Reportes', type: 'link', icon: 'av_timer' },
   { state: 'persona', type: 'link', name: 'Usuarios', icon: 'account_circle' },
   { state: 'estacion', type: 'link', name: 'Estaciones', icon: 'local_gas_station' },
   { state: 'monitoreos', type: 'link', name: 'Lecturas de los Tanques', icon: 'my_location' },
   { state: 'ventas', type: 'link', name: 'Ventas de la Estacion', icon: 'monetization_on' },
   { state: 'combustible', type: 'link', name: 'Compras de Combustible', icon: 'attach_money' },

   { state: 'medicion', type: 'link', name: 'Nivel en Tiempo Real', icon: 'router' },
  // { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
  // { state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
  // { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
  // { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
  // { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
  // { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' },
  // {
  //   state: 'expansion',
  //   type: 'link',
  //   name: 'Expansion Panel',
  //   icon: 'vertical_align_center'
  // },
  // { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette' },
  // { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
  // {
  //   state: 'progress-snipper',
  //   type: 'link',
  //   name: 'Progress snipper',
  //   icon: 'border_horizontal'
  // },
  // {
  //   state: 'progress',
  //   type: 'link',
  //   name: 'Progress Bar',
  //   icon: 'blur_circular'
  // },
  // {
  //   state: 'dialog',
  //   type: 'link',
  //   name: 'Dialog',
  //   icon: 'assignment_turned_in'
  // },
  // { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
  // { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
  // { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
  // {
  //   state: 'slide-toggle',
  //   type: 'link',
  //   name: 'Slide Toggle',
  //   icon: 'all_inclusive'
  // }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
