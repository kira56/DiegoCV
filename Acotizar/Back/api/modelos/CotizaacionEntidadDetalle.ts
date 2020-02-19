import { DataTypes } from 'sequelize';

export let CotizacionEntidadDetalle_model = (sequelize: any) => {

    let cotizacionDetalle = sequelize.define('t_cotizacionentidaddetalle', {
        cotiedet_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        
        cotiedet_prec: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        cotie_cant: {
            type: DataTypes.DECIMAL,
            
        }
    }, {
        tableName: 't_cotizacionentidaddetalle',
        timestamps: true
    });

    return cotizacionDetalle;

}