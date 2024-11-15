module.exports = (sequelize, DataTypes) => {
    const Dokter = sequelize.define('Dokter', {
        ID_Dokter: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ID_Akun: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Nama_Dokter: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Spesialis: {
            type: DataTypes.ENUM('Mata', 'Gigi', 'THT', 'Syaraf'),
            allowNull: true
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Dokter;
};