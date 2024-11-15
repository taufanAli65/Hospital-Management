const express = require('express');
const router = express.Router();
const { Dokter } = require('../models');
const {authenticate} = require('../middleware/auth');

//menampilkan semua data dokter
router.get('/', authenticate, async(req, res, next) => {
    try {
        const dokter = await Dokter.findAll({attributes:['Nama_Dokter', 'Spesialis']})
        res.json(dokter);
    } catch(err) {
        next(err)
    };
});

//menampikan data dokkter tertentu
router.get('/:id', authenticate, async(req, res, next) => {
    const { id } = req.params;
    try {
        const dokter = await Dokter.findOne({where: {ID_Dokter: id}, attributes:['Nama_Dokter', 'Spesialis']})
        res.json(dokter)
    } catch (error) {
        next(error);
    }
})

//menampilkan dokter berdasarkan spesialis
router.get('/spesialis/:Spesialis', authenticate, async(req, res, next) => {
    const { Spesialis } = req.params;
    try{
        const dokter = await Dokter.findAll({where: { Spesialis }, attributes:['Nama_Dokter', 'Spesialis']});
        if (dokter.length === 0) {
            return res.status(404).json({ message: 'Dokter dengan spesialis tersebut tidak ada' });
        }
        res.json(dokter);
    } catch (err) {
        next(err);
    }
})

module.exports = router;