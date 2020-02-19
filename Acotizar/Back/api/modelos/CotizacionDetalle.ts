import { DataTypes } from 'sequelize';

export let cotizacionDetalle_model = (sequelize: any) => {

  let detCotiza = sequelize.define('t_cotizaciondetalle', {
    cdet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cdet_cant: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }

  }, {
    tableName: 't_cotizaciondetalle',
    timestamps: true
  });

  return detCotiza;

}