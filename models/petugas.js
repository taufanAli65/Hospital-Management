module.exports = (sequelize, DataTypes) => {
    const Petugas = sequelize.define('Petugas', {
        ID_Petugas: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ID_Akun: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Nama_Petugas: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Jabatan: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Petugas;
};