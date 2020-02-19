import { DataTypes } from 'sequelize';

export let UnidadMedida_model = (sequelize: any) => {

  let UnidadMedida = sequelize.define('t_UnidadDeMedida', {
    um_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    um_nom: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 't_UnidadDeMedida',
    timestamps: true
  });

  return UnidadMedida;

}