import { DataTypes,Sequelize } from 'sequelize'
export let entidad_model=(sequelize:Sequelize)=>{
    let entidad=sequelize.define('t_entidad',{
        ent_id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false            
        },
        ent_nom:{
            type:DataTypes.TEXT
        },
        ent_rz:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        ent_ruc:{
            type:DataTypes.STRING(11),
            allowNull:false
        },
        ent_tipo:{
            type:DataTypes.STRING(40),
            allowNull:true
        },
        ent_pweb:{
            type:DataTypes.STRING(50),
        },
        ent_dir:{
            type:DataTypes.STRING(80),
            allowNull:true
        },
        ent_est:{ // ACTIVO / DESACTIVO
            type:DataTypes.STRING(45),
            allowNull:true
        }
    },{
        tableName:'t_entidad',
        timestamps:true
    })
    return entidad;
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