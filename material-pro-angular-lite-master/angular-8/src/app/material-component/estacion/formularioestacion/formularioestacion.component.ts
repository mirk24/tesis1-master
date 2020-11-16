import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder,Validators } from '@angular/forms'
import { EstacionService } from '../../../services/estacion.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-formularioestacion',
  templateUrl: './formularioestacion.component.html',
  styleUrls: ['./formularioestacion.component.css']
})
export class FormularioestacionComponent implements OnInit {

  per={nombre_est:'',ubicacion:'',numero_playas:'',numero_disp:'',numero_tanques:'',telefono:'',encargado:'',tanques:{cantidad_max:'',cantidad_min:'',tipo_tanque:''},_id:''};

  error=[];
  form = this.fb.group({
    nombre_est: ['',[Validators.required]],
    ubicacion: ['',[Validators.required]],
    numero_playas: ['',[Validators.required,Validators.maxLength(1), Validators.pattern("^[0-9]*$")]],
    numero_disp: ['',[Validators.required,Validators.maxLength(1), Validators.pattern("^[0-9]*$")]],
    numero_tanques: ['',[Validators.required,Validators.maxLength(1), Validators.pattern("^[0-9]*$")]],
    telefono: ['',[Validators.required,Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
    encargado: ['',[Validators.maxLength(100)]],
    cantidad_max:  ['',[Validators.required,Validators.maxLength(4), Validators.pattern("^[0-9]*$")]],
    cantidad_min: ['',[Validators.required,Validators.maxLength(4), Validators.pattern("^[0-9]*$")]],
    //cantidad_actual: ['',[Validators.required,Validators.maxLength(4), Validators.pattern("^[0-9]*$")]],
    tipo_tanque: ['',[Validators.required,Validators.maxLength(10), Validators.pattern("^[a-zA-Z]+$")]]


  });
  constructor(
    public dialogRef: MatDialogRef<FormularioestacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public fb:FormBuilder,
    public db:EstacionService
    ,public hper:UsuariosService
  ) {
    this.per=data;

   }
  enviar(){
    
    if(this.per._id){
      this.db.edit(this.per._id,this.per).subscribe((server:any)=>{
        console.log("2ssssssss33333");
        if(server.estado==1)
          this.dialogRef.close({});
        else
          this.error=server.err.message;
      })
    }else{
      console.log(this.per);
      this.db.add(this.per).subscribe((serve:any)=>{
        if(serve.estado==1){
          //this.lista.push(serve.Empleado);
          this.dialogRef.close({data:serve.dato});
        }else{
          //if(isArray(serve.err.errors)){
            this.error=serve.err.message;
          //}else
          //this.error=[serve.err.errors];
          //console.log(this.error[0].ci.message);
        }
      });
    }
  }
  combolista=[];
  ngOnInit() {
    
    this.hper.list().subscribe((datos:any)=>{
      if(datos.estado==1){
        this.combolista=datos.lista;
      }
    })

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
