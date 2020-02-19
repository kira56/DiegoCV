import { DataTypes } from 'sequelize';

export let SubCategoria_model = (sequelize: any) => {

  let subcategoria = sequelize.define('t_subcategoria', {
    scat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    scat_nom: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 't_subcategoria',
    timestamps: true
  });

  return subcategoria;

}