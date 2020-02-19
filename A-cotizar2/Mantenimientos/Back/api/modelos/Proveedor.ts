import { DataTypes } from 'sequelize';

export let Proveedor_model = (sequelize: any) => {

    let Proveedor = sequelize.define('t_proveedor', {
        prov_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        prov_rz: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        prov_RUC: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        prov_pweb: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        prov_dir:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        
    }, {
        tableName: 't_proveedor',
        timestamps: true
    });

    return Proveedor;

}