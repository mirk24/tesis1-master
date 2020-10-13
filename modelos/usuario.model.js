var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var esquema = new Schema({
    nombre:  String,
    ape_pat: String,
    ape_mat:   String,
    ci:   String,
    fecha_nac:   String,
    direccion:   String,
    telefono:   String,
    usuario:{correo: String, contrasenia: String, tipo_usuario: String},
    estado:Number,
},
{
    collection:'usuarios'
}
);

module.exports = mongoose.model('Usuario', esquema);