module.exports = (sequelize, DataTypes) => {
    const Kamar = sequelize.define('kamar', {
        ID_Kamar: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Ruangan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Tipe_Kamar: {
            type: DataTypes.ENUM("III", "II", "I", "VIP", "VVIP"),
            allowNull: false
        },
        Gedung: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Kapasitas: {
            type: DataTypes.INTEGER,
            allowNul: false
        }
    });
    return Kamar;
};