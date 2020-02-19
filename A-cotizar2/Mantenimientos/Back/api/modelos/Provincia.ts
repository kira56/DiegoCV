import { DataTypes } from 'sequelize';

export let Provincia_model = (sequelize: any) => {

  let Provincia = sequelize.define('t_provincia', {
    pro_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    pro_nom: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 't_provincia',
    timestamps: true
  });

  return Provincia;

}