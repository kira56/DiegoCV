import { DataTypes } from 'sequelize';

export let productoentidadprecio_model = (sequelize: any) => {

    let prodEntiPrec = sequelize.define('t_productosentidadprecio', {
        pep_precio: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        pep_ufda:{
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 't_productosentidadprecio',
        timestamps: true
    });

    return prodEntiPrec;

}