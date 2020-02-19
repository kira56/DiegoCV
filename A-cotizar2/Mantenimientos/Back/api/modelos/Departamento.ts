import { DataTypes } from 'sequelize';

export let Departamentos_model = (sequelize: any) => {

  let Departamentos = sequelize.define('t_departamento', {
    dept_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    dept_nom: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 't_departamento',
    timestamps: true
  });

  return Departamentos;

}