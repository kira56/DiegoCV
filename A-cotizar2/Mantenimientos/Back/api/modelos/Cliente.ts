import { DataTypes } from 'sequelize';

export let Cliente_model = (sequelize: any) => {

  let Cliente = sequelize.define('t_cliente', {
    cli_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cli_ndoc: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    cli_nom: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    cli_ape: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    cli_tel:{
        type: DataTypes.STRING(9),
        allowNull: false
    },
    cli_dire:{
        type: DataTypes.STRING(45),
        allowNull: false
    }
  }, {
    tableName: 't_cliente',
    timestamps: true
  });

  return Cliente;

}