import { DataTypes } from 'sequelize';

export let provincia_model = (sequelize: any) => {

  let provincia = sequelize.define('t_provincia', {
    prov_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    prov_nom: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 't_provincia',
    timestamps: true
  });

  return provincia;

}