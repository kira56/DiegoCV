import { DataTypes,Sequelize } from 'sequelize'
export let persona_model=(sequelize:Sequelize)=>{
    let persona=sequelize.define('t_persona',{
        per_id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false            
        },
        per_ndoc:{
            type:DataTypes.STRING(12),
            allowNull:false
        },
        per_desc:{
            type:DataTypes.STRING(25),
            allowNull:false
        },
        per_nom:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        per_ape:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        per_tel:{
            type:DataTypes.STRING(10),
            allowNull:false
        },
        per_dir:{
            type:DataTypes.TEXT,
            
        }
    },{
        tableName:'t_persona',
        timestamps:true
    })
    return persona;
}

/*
ent_id num
ent_nom text
ent_rz
ent_ruc vc(11)
ent_tipo
ent_pweb
ent_dir
ent_dis
*/