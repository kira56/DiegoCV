import { DataTypes } from 'sequelize';

export let ProveeHasCotizacion_model = (sequelize: any) => {

  let ProveeHasCotizacion = sequelize.define('t_proveedor_has_t_cotizacion', {
    provehascoti_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
  }, {
    tableName: 't_proveedor_has_t_cotizacion',
    timestamps: true
  });

  return ProveeHasCotizacion;

}