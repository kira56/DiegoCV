import {Request,Response} from 'express';
import { Entidad } from '../configuracion/Sequelize';
export let getEntidades=(req:Request,res:Response)=>{
    Entidad.findAll().then((objEntidad:any)=>{
        res.status(200).json({
            mensaje:'OK',
            contenido:objEntidad
        })
    })
}
export let postEntidad=(req:Request,res:Response)=>{
    let objEntidad=Entidad.build(req.body);
    objEntidad.save().then((objEntidadCreado:any)=>{
        res.status(201).json(
            {
                ok:true,
                contenido:objEntidadCreado,
                mensaje:"Entidad Creada correctamente"
            }
        )
    }).catch((error:any)=>{
        res.status(500).json(
            {
                ok:true,
                contenido:error,
                mensaje:"Error interno en el servidor"
            }
        )
    })
}
export let getEntidadByIdUser=(req:Request,res:Response)=>{
    Entidad.findAll({
        where: {
          usu_id: req.params.id
        }
      }).then((resultado: any) => {
        res.status(200).json({
          contenido: resultado
        })
      })
}
