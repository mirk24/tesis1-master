import { getLocaleMonthNames } from '@angular/common';
import { Component } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  user=null;
  token=null;
  constructor(private per:UsuariosService){
    if(localStorage.getItem('usuario')){

      this.user=JSON.parse(localStorage.getItem('usuario'));

      this.token=localStorage.getItem('token');
    }
  }

  salir(){
    if(localStorage.getItem('token'))
    {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      document.location.href='/';
    }else{
      document.location.href="/";
    }
  }
}
