module.exports = (sequelize, DataTypes) => {
    const RawatInap = sequelize.define('RawatInap', {
        ID_RawatInap: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ID_Pasien: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ID_Kamar: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tanggal_masuk: {
            type: DataTypes.DATE,
            allowNull: false
        },
        tanggal_keluar: {
            type: DataTypes.DATE,
            allowNull: true
        }
    });
    return RawatInap;
};