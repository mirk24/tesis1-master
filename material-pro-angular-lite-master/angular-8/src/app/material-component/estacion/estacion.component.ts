import { Component, OnInit } from '@angular/core';
import { EstacionService } from '../../services/estacion.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormularioestacionComponent } from './formularioestacion/formularioestacion.component';

@Component({
  selector: 'app-estacion',
  templateUrl: './estacion.component.html',
  styleUrls: ['./estacion.component.css']
})
export class EstacionComponent implements OnInit {

  constructor(private db:EstacionService,
    public dialog: MatDialog) { 

  }
  displayedColumns: string[] = ['nombre_est','ubicacion','numero_playas','numero_disp','numero_tanques','telefono','encargado','cantidad_max','cantidad_min','cantidad_actual','tipo_tanque', 'borrar','editar'];
  lista=[];
  dataSource = new MatTableDataSource<any>()
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
  onBorrar(item){

    
 //     const dialogRef = this.dialog.open(ConfirmarComponent, {
  //      width: '250px',
  //      data: ''
  //    });
  
  /*     dialogRef.afterClosed().subscribe(result => {
        if(result=='ok'){
          this.db.delete(item._id).subscribe((dato:any)=>{
        if(dato.estado==1){

          this.lista.splice(this.lista.indexOf(item),1);
          this.dataSource.data=this.lista;
        }else{

        }
      });
        }
      });*/
  }
  onEditar(item){
    const dialogRef = this.dialog.open(FormularioestacionComponent, {
      width: '850px',
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
    const dialogRef = this.dialog.open(FormularioestacionComponent, {
      width: '850px',
      data: {nombre_est:'',ubicacion:'',numero_playas:'',numero_disp:'',numero_tanques:'',telefono:'',encargado:'',tanques:{cantidad_max:'',cantidad_min:'',cantidad_actual:'',tipo_tanque:''}}
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
