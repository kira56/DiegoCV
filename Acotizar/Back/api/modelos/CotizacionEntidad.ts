import { DataTypes } from 'sequelize';

export let CotizacionEntidad_model = (sequelize: any) => {

    let cotizacionentidad = sequelize.define('t_cotizacionentidad', {
        cotient_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cotient_fech: {
            type: DataTypes.DATE,
            allowNull: false
        },
        cotient_est: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        cotient_vali: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 't_cotizacionentidad',
        timestamps: true
    });

    return cotizacionentidad;

}