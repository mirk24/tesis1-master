var Usuario=require('../modelos/usuario.model');
var jwt=require('jsonwebtoken');
var bcrypt=require('bcrypt');

function listaPersona(req, res){
    Usuario.find({estado:1},(err,resul)=>{
         res.status(200).json({mgs:'todo legal',estado:1, lista:resul});
    })
   
}

function login(req, res){
    Usuario.find({
        estado:1,
        'usuario.correo':req.body.usuario,
        //'usuario.contrasenia':req.body.password
    },(err,resul)=>{

        console.log("error",err);
        console.log("info",resul);
        if(err)
            res.status(200).json({mgs:'todo legal',estado:0, usuario:null});
        else if(resul.length==0)
            res.status(200).json({mgs:'todo legal',estado:0, usuario:null});
        else{
            console.log("password:",bcrypt.hashSync(req.body.usuario,10));
            bcrypt.compare(req.body.password,resul[0].usuario.contrasenia,(err_p,va)=>
            {
                if(va){
                    let token=jwt.sign({user:{id:resul[0]._id,nombre:
                        resul[0].nombre+' '+resul[0].ape_pat+' '+resul[0].ape_mat
                    }},'jugando');
                    res.status(200).json({mgs:'todo legal',estado:1,token:token, usuario:resul[0]});
                }else
                res.status(200).json({mgs:'todo legal',estado:0});
            }
            );
            
        }
    })
}
function nuevaPersona(req, res){
    req.body.estado=1;
    let est= new Usuario(req.body);
    est.usuario.contrasenia=bcrypt.hashSync(est.usuario.contrasenia,10);
    est.save(
        (err,nuevo)=>{
            if (err)
                return res.status(200).json({estado:0,error:err});
            if (!nuevo)
                return res.status(200).json({estado:0,error:'ops paso algo malo'});
            else
                return res.status(200).json({estado:1,estaciones:nuevo});
        }
    )
}
//url:dominio.com/api/persona/id put
function editarPersona(req, res){
    console.log(req.params.id);
    Usuario.findByIdAndUpdate(req.params.id,req.body,(err,resultado)=>{
        if (err)
            return res.status(200).json({estado:0,error:err});
        if (!resultado)
            return res.status(200).json({estado:0,error:'ops paso algo malo'});
        else
            return res.status(200).json({estado:1,estaciones:resultado});
    });
}

function borrarPersona(req, res){

    Usuario.findByIdAndUpdate(req.params.id,{estado:0},req.body,(err,resultado)=>{
        if (err)
            return res.status(200).json({estado:0,error:err});
        if (!resultado)
            return res.status(200).json({estado:0,error:'ops paso algo malo'});
        else
            return res.status(200).json({estado:1,estaciones:resultado});
    });
}

function buscarPersona(req, res){
    res.status(200).json({mgs:'todo legal4'});
}




module.exports={
    lista:listaPersona,
    nuevo:nuevaPersona,
    editar:editarPersona,
    borrar:borrarPersona,
    buscar:buscarPersona,
    login:login
}