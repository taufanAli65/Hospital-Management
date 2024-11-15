module.exports = (sequelize, DataTypes) => {
    const Pasien = sequelize.define('Pasien', {
        ID_Pasien:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNUll: false
        },
        NIK: {
            type: DataTypes.STRING,
            unique: true,
            allowNUll: true
        },
        ID_Akun: {
            type: DataTypes.INTEGER,
            allowNUll: false
        },
        Nama_Pasien: {
            type: DataTypes.STRING,
            allowNUll: true
        },
        No_Telepon: {
            type: DataTypes.STRING,
            allowNUll: true
        }
    });
    return Pasien;
};