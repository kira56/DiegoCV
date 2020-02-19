import {Request,Response} from 'express';
import { Cotizacion } from '../configuracion/Sequelize';

export let getCotizacion=(req:Request,res:Response)=>{
    Cotizacion.findAll().then((objCotizacion:any)=>{
        res.status(200).json({
            mensaje:'OK',
            contenido:objCotizacion
        })
    })
}
export let getCotizacionById = (req: Request, res: Response) => {
    Cotizacion.findByPk(req.params.id).then((objCotizacion: any) => {
        if (objCotizacion) {
            res.status(200).json({
                message: 'Cotizacion encontrado ',
                Cotizacion: objCotizacion
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro la Cotizacion'
            })
        }
    })
}
export let getCotizacionByEstado = (req: Request, res: Response)=> {
    Cotizacion.findAll({
        where: {
          coti_est: req.params.est
        }
      }).then((resultado: any) => {
        res.status(200).json({
          message: 'ok',
          contenido: resultado
        })
      })
}
export let postCotizacion=(req:Request,res:Response)=>{
    let objCotizacion=Cotizacion.build(req.body);
    objCotizacion.save().then((objCotizacionCreado:any)=>{
        res.status(201).json(
            {
                ok:true,
                contenido:objCotizacionCreado,
                mensaje:"Cotizacion Creada correctamente"
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
export let updateCotizacion = (req: Request, res: Response) => {
    Cotizacion.update(
        {
            dist_nom: req.body.Cotizacion.dist_nom,
            prov_id: req.body.Cotizacion.prov_id
        },
        {
            where:{
                dist_id:req.body.Cotizacion.dist_id
            }
        }).then((Actualizado:any)=>{
            Cotizacion.findByPk(Actualizado[0]).then((objCotizacion:any)=>{
                res.status(200).json({
                    message:'ok',
                    contenido:objCotizacion

                })
            })
        }).catch((error:any)=>{
            res.status(501).json({
                message:'error',
                contenido:error
            })
        })
}
export let deleteCotizacion = (req: Request, res: Response) => {
    let {id} = req.params;

    Cotizacion.destroy({
        where:{
            dist_id:id
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"Cotizacion Eliminada",
                id:id
            }
            res.status(200).send(rpta);
        }else{
            let rpta = {
                success:false,
                message:'No se ha podido Eliminar la cotizacion',
                id:''
            }
            res.status(500).send(rpta);
        }
    })
}