import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';



import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators'; 

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  

    constructor(private db:VentasService,
      public dialog: MatDialog) { 
  
    }
    displayedColumns: string[] = ['fecha','volumen','precio','totalventa','vendedor','borrar','importar'];
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
    uploadFile(file) {
      const formData = new FormData();  
      formData.append('file', file.data);  
      file.inProgress = true;  
      this.db.upload(formData).pipe(
        map(event => {  
          switch (event.type) {  
            case HttpEventType.UploadProgress:  
              file.progress = Math.round(event.loaded * 100 / event.total);  
              break;  
            case HttpEventType.Response:  
              return event;  
          }  
        }),  
        catchError((error: HttpErrorResponse) => {  
          file.inProgress = false;  
          return of(`${file.data.name} upload failed.`);  
        })).subscribe((event: any) => {  
          if (typeof (event) === 'object') {  
            console.log(event.body);  
          }  
        });  
    }
    onClick() {  
      const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
      for (let index = 0; index < fileUpload.files.length; index++)  
      {  
       const file = fileUpload.files[index];  
       this.files.push({ data: file, inProgress: false, progress: 0});  
      }  
        this.uploadFiles();  
      };  
      fileUpload.click();  
    }
    private uploadFiles() {  
        this.fileUpload.nativeElement.value = '';  
        this.files.forEach(file => {  
          this.uploadFile(file);  
        });  
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
    
      
  
  
  }
  
