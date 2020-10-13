var express = require('express');
var router = express.Router();
var control=require('../controladores/persona.controller');
/* GET home page. */

/* method get -> listar buscar
*  method post -> insertar
*  method put -> editar
*  method delete -> borrar*/

// url -> dominio.com/api/persona
router.get('/', control.lista);
router.post('/', control.nuevo);
router.put('/:id', control.editar);
router.delete('/:id', control.borrar);
router.get('/buscar/:q', control.buscar);

//router.get('/login', control.login);
//router.get('/close', control.close);
module.exports = router;