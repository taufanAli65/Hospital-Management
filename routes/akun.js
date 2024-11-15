var express = require('express');
var router = express.Router();
var akun = require('../models');

router.get('/', function(req, res, next){
    res.status(403).json('Forbidden');
})

module.exports = router;