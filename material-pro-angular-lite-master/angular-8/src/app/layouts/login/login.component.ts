import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstacionService } from '../../services/estacion.service';
import { UsuariosService } from '../../services/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:string='';
  password:string='';
  lista = [];
  constructor(private ht:UsuariosService,
    public db: EstacionService,
    private router:Router) { }
    dataSource = new MatTableDataSource<any>();

    cargarDatosTabla() {
      this.db.list().subscribe((dato: any) => {
        console.log(dato)
        if (dato.estado == 1) {
          this.lista = dato.lista;
          this.dataSource.data = this.lista;
        }
        else {
          this.lista = this.dataSource.data = [];
        }
      });
    }
  combolista=[];
  ngOnInit() {
    localStorage.removeItem('token');
    this.db.list().subscribe((datos:any)=>{
      if(datos.estado==1){
        this.combolista=datos.lista;
      }
    })
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
