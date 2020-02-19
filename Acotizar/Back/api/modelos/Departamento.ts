import { DataTypes } from 'sequelize';

export let Departamento_model = (sequelize: any) => {

  let departamento = sequelize.define('t_departamento', {
    dpto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    dpto_nom: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 't_departamento',
    timestamps: true
  });

  return departamento;

}