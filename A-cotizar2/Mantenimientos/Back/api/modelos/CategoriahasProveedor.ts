import { DataTypes } from 'sequelize';

export let CategoriashasProveedor_model = (sequelize: any) => {

  let CategoriashasProveedor = sequelize.define('t_categoria_has_t_proveedor', {
    catehasprove_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
  }, {
    tableName: 't_categoria_has_t_proveedor',
    timestamps: true
  });

  return CategoriashasProveedor;

}