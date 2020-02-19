import { DataTypes, Sequelize } from 'sequelize';

export let Cotizacion_model = (sequelize: Sequelize) => {

    let cotizacion = sequelize.define('t_cotizacion', {
        coti_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        coti_nro: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        coti_fech: {
            type: DataTypes.DATE,
            allowNull: false
        },
        coti_est: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        tableName: 't_cotizacion',
        timestamps: true
    });

    return cotizacion;

}