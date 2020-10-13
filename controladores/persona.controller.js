var Usuario=require('../modelos/usuario.model');
function listaPersona(req, res){
    Usuario.find({estado:1},(err,resul)=>{
         res.status(200).json({mgs:'todo legal',estado:1, lista:resul});
    })
   
}

function nuevaPersona(req, res){
    req.body.estado=1;
    let est= new Usuario(req.body);
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
    res.status(200).json({mgs:'todo legal3'});
}

function buscarPersona(req, res){
    res.status(200).json({mgs:'todo legal4'});
}




module.exports={
    lista:listaPersona,
    nuevo:nuevaPersona,
    editar:editarPersona,
    borrar:borrarPersona,
    buscar:buscarPersona
}