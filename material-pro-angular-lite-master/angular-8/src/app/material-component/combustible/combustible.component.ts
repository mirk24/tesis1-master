import { Component, OnInit } from '@angular/core';
import { CombustibleService } from '../../services/combustible.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormulariocombustibleComponent } from './formulariocombustible/formulariocombustible.component';

@Component({
  selector: 'app-combustible',
  templateUrl: './combustible.component.html',
  styleUrls: ['./combustible.component.css']
})
export class CombustibleComponent implements OnInit {

  constructor(private db:CombustibleService,
    public dialog: MatDialog) { 

  }
  displayedColumns: string[] = ['litros_comprados','fecha_adquirida','tipo_de_combustible','chofer','placa_sisterna', 'borrar','editar'];
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
    const dialogRef = this.dialog.open(FormulariocombustibleComponent, {
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
    const dialogRef = this.dialog.open(FormulariocombustibleComponent, {
      width: '650px',
      data: {litros_comprados:'',fecha_adquirida:'',tipo_de_combustible:'',chofer:'',placa_sisterna:''}
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
