var express = require('express');
var router = express.Router();
var control=require('../controladores/importar.controller');
/* GET home page. */

/* method get -> listar buscar
*  method post -> insertar
*  method put -> editar
*  method delete -> borrar*/

// url -> dominio.com/api/persona
router.get('/', control.lista);
router.post('/', control.nuevo);



module.exports = router;