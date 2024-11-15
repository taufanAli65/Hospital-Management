const express = require('express');
const router = express.Router();
const { Kamar } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');


//menampilkan semua kamar
router.get('/', authenticate, async (req, res, next) => {
  try {
    const kamar = await Kamar.findAll();
    res.json(kamar);
  } catch (err) {
    next(err);
  }
});

//menambahkan kamar
router.post('/addKamar', authenticate, authorize(['petugas']), async (req, res, next) => {
  const {Ruangan, Tipe_Kamar, Gedung, Kapasitas} = req.body;
  try {
    const newKamar = await Kamar.create({
      Ruangan,
      Tipe_Kamar,
      Gedung, 
      Kapasitas
    })
    res.json(newKamar)
  } catch (error) {
    next(error);
  }
})

//menampilkan kamar berdasarkan gedung;
router.get('/:Gedung', authenticate, authorize(['petugas']), async (req, res, next) => {
  const { Gedung } = req.params;
  try {
    const kamar = await Kamar.findAll({where: { Gedung }})
    res.json(kamar);
  } catch(error) {
    next(error);
  }
});


module.exports = router;