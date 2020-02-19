import { DataTypes } from 'sequelize';

export let Distrito_model = (sequelize: any) => {

  let Distrito = sequelize.define('t_distrito', {
    dist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    dist_nom: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 't__distrito',
    timestamps: true
  });

  return  Distrito;

}