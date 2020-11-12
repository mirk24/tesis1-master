import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder,Validators } from '@angular/forms'
import { UsuariosService } from '../../../services/usuarios.service';
import {MatAccordion} from '@angular/material/expansion';
//import { MatFormFieldModule, MatInputModule } from '@angular/material';

@Component({
  selector: 'app-formulariousuario',
  templateUrl: './formulariousuario.component.html',
  styleUrls: ['./formulariousuario.component.css']
})
export class FormulariousuarioComponent implements OnInit {

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  
  per={nombre:'',ape_pat:'',ape_mat:'',ci:'',fecha_nac:'',direccion:'',usuario:{correo:'',contrasenia:'',tipo_usuario:''},_id:''};

  error=[];
  form = this.fb.group({
    nombre: ['',[Validators.required]],
    ape_pat: ['',[Validators.required,Validators.maxLength(10)]],
    ape_mat: ['',[Validators.required,Validators.maxLength(10)]],
    ci: ['',[Validators.required,Validators.maxLength(10)]],
    fecha_nac: ['',[Validators.required,Validators.maxLength(10)]],
    direccion: ['',[Validators.required,Validators.maxLength(10)]],
    correo: ['',[Validators.required,Validators.email]],
    contrasenia:  ['',[Validators.required,Validators.maxLength(10)]],
    tipo_usuario: ['',[Validators.required,Validators.maxLength(10)]]
  });
  

  
  constructor(
    public dialogRef: MatDialogRef<FormulariousuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public fb:FormBuilder,
    public db:UsuariosService
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
          this.dialogRef.close({data:serve.estaciones});
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

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
