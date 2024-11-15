module.exports = (sequelize, DataTypes) => {
    const Periksa = sequelize.define('Periksa', {
        ID_Pemeriksaan: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ID_RawatInap: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ID_Dokter:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Tanggal_Pemeriksaan: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Keluhan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Hasil_Pemeriksaan: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Periksa
};