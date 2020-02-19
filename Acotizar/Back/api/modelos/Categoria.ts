import { DataTypes } from 'sequelize';

export let Categorias_model = (sequelize: any) => {

  let Categorias = sequelize.define('t_categoria', {
    cat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cat_nom: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 't_categoria',
    timestamps: true
  });

  return Categorias;

}