const express = require('express');
const router = express.Router();
const {RawatInap, Periksa, Pasien, Kamar} = require('../models');
const {authenticate, authorize} = require('../middleware/auth');


//menampilkan seluruh data pasien yang rawat inap
router.get('/', authenticate, authorize(['petugas', 'dokter']), async (req, res, next) => {
    try {
        const rawatInap = await RawatInap.findAll();
        res.json(rawatInap);
    } catch (error) {
        next(error);
    }
})

// Endpoint untuk menampilkan data RawatInap berdasarkan ID_RawatInap
router.get('/:id', async (req, res, next) => {
    try {
        const rawatInap = await RawatInap.findByPk(req.params.id);
        
        if (rawatInap) {
            res.json(rawatInap);
        } else {
            res.status(404).json({ message: 'RawatInap not found' });
        }
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { ID_Pasien, ID_Kamar, tanggal_masuk, tanggal_keluar } = req.body;
        const rawatInap = await RawatInap.findByPk(req.params.id);
        
        if (rawatInap) {
            rawatInap.ID_Pasien = ID_Pasien;
            rawatInap.ID_Kamar = ID_Kamar;
            rawatInap.tanggal_masuk = tanggal_masuk;
            rawatInap.tanggal_keluar = tanggal_keluar;
            await rawatInap.save();
            res.json(rawatInap);
        } else {
            res.status(404).json({ message: 'RawatInap not found' });
        }
    } catch (err) {
        next(err);
    }
});

//menambah pasien rawat inap
router.post('/add', authenticate, authorize(['petugas', 'dokter']), async (req, res, next) => {
    const {ID_Kamar, ID_Pasien, tanggal_masuk} = req.body;
    try {
        const pasienMasuk = await RawatInap.create({
            ID_Kamar,
            ID_Pasien,
            tanggal_masuk
        });
        res.json(pasienMasuk)
    } catch (error) {
        next(error);
    }
})

module.exports = router;