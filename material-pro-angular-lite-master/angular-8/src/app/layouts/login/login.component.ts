import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:string='';
  password:string='';
  constructor(private ht:UsuariosService,
    private router:Router) { }

  ngOnInit() {
    localStorage.removeItem('token');
  }
  entrar(){
    this.ht.login({usuario:this.usuario,password:this.password}).subscribe((dato:any)=>{
      console.log(dato);
      if(dato.estado){
        console.log(dato);
        localStorage.setItem('token',dato.token);
        localStorage.setItem('usuario',JSON.stringify(dato.usuario));
        this.router.navigate(['/dashboard']);
      }
    });
  }

  

}
