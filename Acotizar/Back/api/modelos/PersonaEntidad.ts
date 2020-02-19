import { DataTypes } from 'sequelize';

export let personaEntidad_model = (sequelize: any) => {

  let pEntidad = sequelize.define('t_personaentidad', {
    
  }, {
    tableName: 't_personaentidad',
    timestamps: true
  });

  return pEntidad; //retornando
  

}