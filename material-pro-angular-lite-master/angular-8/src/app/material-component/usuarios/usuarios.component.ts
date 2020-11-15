import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormulariousuarioComponent } from './formulariousuario/formulariousuario.component';
//import { ConfirmarComponent } from '../../shared/confirmar/confirmar.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private db:UsuariosService,
    public dialog: MatDialog) { 

  }
  displayedColumns: string[] = ['nombre','ape_pat','ape_mat','ci','fecha_nac','direccion','correo','tipo_usuario', 'borrar','editar'];
  lista=[];
  dataSource = new MatTableDataSource<any>();
  ngOnInit() {
    this.db.list().subscribe((dato:any)=>{
      console.log("pppppp");
      if(dato.estado==1){
        
        this.lista=dato.lista;
        this.dataSource.data=this.lista;
        console.log("pppppp");
      }else{
        this.lista=this.dataSource.data=[];

      }
     
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onBorrar(item){

    
 //     const dialogRef = this.dialog.open(ConfirmarComponent, {
  //      width: '250px',
  //      data: ''
  //    });
  
  /*     dialogRef.afterClosed().subscribe(result => {
        if(result=='ok'){*/
      //     this.db.delete(item._id).subscribe((dato:any)=>{
      //       console.log("entraaaaa");
      //   if(dato.estado==1){
      //     console.log("entra");
      //     this.lista.splice(this.lista.indexOf(item),1);
      //     this.dataSource.data=this.lista;
      //   }else{

      //   }
        
      // });
        //}
     
  }
  onEditar(item){
    const dialogRef = this.dialog.open(FormulariousuarioComponent, {
      width: '650px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      //this.lista.push(result.data);
      //this.dataSource.data=this.lista;
      console.log(this.lista);
    });
  }
  open(){
    const dialogRef = this.dialog.open(FormulariousuarioComponent, {
      width: '750px',
      data: {nombre:'',ape_pat:'',ape_mat:'',ci:'',fecha_nac:'',direccion:'',usuario:{correo:'',contrasenia:'',tipo_usuario:''}}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.lista.push(result.data);
      this.dataSource.data=this.lista;
      console.log(this.lista);
    });
  }


}
