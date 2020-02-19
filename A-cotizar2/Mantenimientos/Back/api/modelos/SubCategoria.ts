import { DataTypes } from 'sequelize';

export let SubCategoria_model = (sequelize: any) => {

  let SubCategoria = sequelize.define('t_subcategoria', {
    subc_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    subc_nom: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 't_subcategoria',
    timestamps: true
  });

  return SubCategoria;

}