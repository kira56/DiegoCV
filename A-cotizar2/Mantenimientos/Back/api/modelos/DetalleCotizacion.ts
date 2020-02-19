import { DataTypes } from 'sequelize';
export let DetalleCotizacion_model = (sequelize: any) => {

    let DetalleCotizacion = sequelize.define('t_detallecotizacion', {
      detcot_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    detcot_imgRef: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    detcot_especificacion: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    detcot_cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    detcot_precio: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    detcot_produc: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    detcot_coti: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    
    
}, {
    tableName: 't_detallecotizacion',
    timestamps: true
});

return DetalleCotizacion;

}