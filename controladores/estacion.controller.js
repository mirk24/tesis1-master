var Estacion=require('../modelos/estacion.model');
function listaEstacion(req, res){
    Estacion.find({estado:1}).populate('encargado').exec((err,resul)=>{
        console.log(err);
         res.status(200).json({mgs:'todo legal',estado:1, lista:resul});
    })
   
}

function nuevaEstacion(req, res){
    req.body.estado=1;
    let est= new Estacion(req.body);
    est.save(
        (err,nuevo)=>{
            if (err)
                return res.status(200).json({estado:0,error:err});
            if (!nuevo)
                return res.status(200).json({estado:0,error:'ops paso algo malo'});
            else
                return res.status(200).json({estado:1,dato:nuevo});
        }
    )
}
//url:dominio.com/api/persona/id put
function editarEstacion(req, res){
    console.log(req.params.id);
    Estacion.findByIdAndUpdate(req.params.id,req.body,(err,resultado)=>{
        if (err)
            return res.status(200).json({estado:0,error:err});
        if (!resultado)
            return res.status(200).json({estado:0,error:'ops paso algo malo'});
        else
            return res.status(200).json({estado:1,dato:resultado});
    });
}


//function buscarPersona(req, res){
  //  Estaciones.findOne({})
//}



module.exports={
    lista:listaEstacion,
    nuevo:nuevaEstacion,
    editar:editarEstacion
    //borrar:borrarPersona,
    //buscar:buscarPersona
}