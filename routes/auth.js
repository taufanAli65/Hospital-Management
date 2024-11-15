const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Akun, Dokter, Petugas, Pasien } = require('../models');
const { authenticate } = require('../middleware/auth');
require('dotenv').config();

// Register
router.post('/register', async (req, res) => {
    const { Username, Password, Jenis_Akun, Tanggal_Lahir, Alamat, Jenis_Kelamin } = req.body;
    
    // console.log("Register Body: ", req.body); // Logging untuk debugging

    try {
        // Validasi input
        if (!Username || !Password || !Jenis_Akun || !Tanggal_Lahir || !Alamat) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        // Buat entri baru di Akun
        const newAkun = await Akun.create({ 
            Username, 
            Password, 
            Jenis_Akun, 
            Tanggal_Lahir, 
            Alamat, 
            Jenis_Kelamin 
        });
        // Auto nambahin data pasien/petugas/dokter saat buat akun
        if (newAkun.Jenis_Akun === 'petugas'){
            await Petugas.create({ ID_Akun: newAkun.id });
        } else if (newAkun.Jenis_Akun === 'dokter'){
            await Dokter.create({ ID_Akun: newAkun.id });
        } else if (newAkun.Jenis_Akun === 'pasien'){
            await Pasien.create({ ID_Akun: newAkun.id });
        }

        // Kirim respon sukses
        res.status(201).json({ message: 'User registered successfully', data: newAkun.id });
    } catch (error) {
        // Tangani kesalahan
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
});

// Login
router.post('/login', async (req, res) => {
  const { Username, Password } = req.body;
  try {
    const akun = await Akun.findOne({ where: { Username } });
    if (!akun) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(Password, akun.Password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: akun.ID_Akun, role: akun.Jenis_Akun }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Nambahin data diri tiap akun
router.put('/:id', authenticate, async (req, res) => {
    try {
        const akun = await Akun.findByPk(req.params.id);

        if (!akun) {
            return res.status(404).json({ error: 'User not found' });
        }

        const role = akun.Jenis_Akun; // Mengambil Jenis_Akun dari akun yang ditemukan
        const ID_Akun = akun.id; // Mengambil ID_Akun dari akun yang ditemukan

        if (role === 'dokter') {
            const dokter = await Dokter.findOne({ where: { ID_Akun } });
            if (dokter) {
                const { Nama_Dokter, Spesialis, Email } = req.body;
                await dokter.update({ Nama_Dokter, Spesialis, Email });
                res.json(dokter);
            } else {
                return res.status(404).json({ error: 'Dokter not found' });
            }
        } else if (role === 'pasien') {
            const pasien = await Pasien.findOne({ where: { ID_Akun } });
            if (pasien) {
                const { NIK, Nama_Pasien, No_Telepon } = req.body;
                await pasien.update({ NIK, Nama_Pasien, No_Telepon });
                res.json(pasien);
            } else {
                return res.status(404).json({ error: 'Pasien not found' });
            }
        } else if (role === 'petugas') {
            const petugas = await Petugas.findOne({ where: { ID_Akun } });
            if (petugas) {
                const { Nama_Petugas, Email, Jabatan } = req.body;
                await petugas.update({ Nama_Petugas, Email, Jabatan });
                res.json(petugas);
            } else {
                return res.status(404).json({ error: 'Petugas not found' });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//update account
router.put('/akun/:id', authenticate, async(req, res, next) => {
    const { Username, Password, Jenis_Akun, Tanggal_Lahir, Alamat, Jenis_Kelamin } = req.body;
    try {
        const akun = await Akun.findByPk(req.params.id);
        await akun.update({ 
            Username, 
            Password, 
            Jenis_Akun, 
            Tanggal_Lahir, 
            Alamat, 
            Jenis_Kelamin 
        });
        res.json(akun);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;