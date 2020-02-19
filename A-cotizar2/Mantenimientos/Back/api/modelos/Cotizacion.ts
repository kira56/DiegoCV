import { DataTypes } from 'sequelize';

export let Cotizacion_model = (sequelize: any) => {

    let Cotizacion = sequelize.define('t_cotizacion', {
        coti_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        coti_nom: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        coti_igv: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        coti_fech: {
            type: DataTypes.DATE,
            allowNull: false
        },
        coti_nro: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        coti_RUC:{
            type: DataTypes.STRING(9),
            allowNull: false
        },
    }, {
        tableName: 't_cotizacion',
        timestamps: true
    });

    return Cotizacion;

}