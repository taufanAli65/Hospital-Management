const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Akun = sequelize.define('Akun', {
        Username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Jenis_Akun: {
            type: DataTypes.ENUM("pasien", "petugas", "dokter"),
            allowNull: false
        },
        Tanggal_Lahir: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Alamat: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Jenis_Kelamin: {
            type: DataTypes.ENUM('Laki-Laki', 'Perempuan'),
            allowNull: false
        }
    }, {
        hooks: {
            beforeCreate: async (akun) => {
                const salt = await bcrypt.genSalt(10);
                akun.Password = await bcrypt.hash(akun.Password, salt);
            }
        }
    });
    return Akun;
};