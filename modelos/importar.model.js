var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var esquema = new Schema({
    fecha:  Date,
    volumen: Number,
    precio:   Number,
    totalventa: Number,
    vendedor: String,
    estado: Number

},{
    collection:'importar'
});

module.exports = mongoose.model('Importar', esquema);