import { DataTypes } from 'sequelize';

export let UsuariohasCotizacion_model = (sequelize: any) => {

  let UsuariohasCotizacion = sequelize.define('t_usuario_has_t_cotizacion', {
    usuhascoti_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
  }, {
    tableName: 't_usuario_has_t_cotizacion',
    timestamps: true
  });

  return UsuariohasCotizacion;

}