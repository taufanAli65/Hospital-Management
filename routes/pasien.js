const express = require('express');
const router = express.Router();
const { Pasien, RawatInap, Kamar } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint untuk menampilkan semua data Pasien, hanya petugas & dokter yang bisa akses
router.get('/', authenticate, authorize(['petugas', 'dokter']), async (req, res, next) => {
    try {
        const pasien = await Pasien.findAll();
        res.json(pasien);
    } catch (err) {
        next(err);
    }
});


//menampilkan semua pasien yang ada dalam 1 ruangan yang sama
router.get('/:ruangan', authenticate, authorize(['petugas', 'dokter']), async (req, res, next) => {
    const { ruangan } = req.params;
    try {
        // Mencari kamar berdasarkan ruangan
        const kamar = await Kamar.findOne({
            where: { Ruangan: ruangan },
            attributes: ['ID_Kamar', 'Ruangan', 'Gedung']
        });

        if (!kamar) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Mencari pasien yang berada di kamar yang ditemukan
        const pasien = await Pasien.findAll({
            attributes: ['Nama_Pasien', 'No_Telepon'],
            include: [
                {
                    model: RawatInap,
                    attributes: ['Tanggal_Masuk', 'Tanggal_Keluar'],
                    where: { ID_Kamar: kamar.ID_Kamar }
                }
            ]
        });
        res.json({
            kamar,
            pasien
        });
    } catch (error) {
        res.json(error)
    }
});

module.exports = router;