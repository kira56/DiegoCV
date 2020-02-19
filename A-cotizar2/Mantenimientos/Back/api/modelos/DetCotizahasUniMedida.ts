import { DataTypes } from 'sequelize';

export let DetalleHasUnidad_model = (sequelize: any) => {

  let DetalleHasUnidad = sequelize.define('t_detallecotizacion_has_t_UnidadDeMedida', {
    detcotuni_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
  }, {
    tableName: 't_detallecotizacion_has_t_UnidadDeMedida',
    timestamps: true
  });

  return DetalleHasUnidad;

}