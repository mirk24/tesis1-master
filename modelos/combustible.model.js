var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var esquema = new Schema({
    litros_comprados: Number,
    fecha_adquirida: Date,
    tipo_de_combustible: String,
    chofer: String,
    placa_sisterna: String,
    estado: Number,
},
{
    collection:'combustible'
}
);

module.exports = mongoose.model('Combustible', esquema);