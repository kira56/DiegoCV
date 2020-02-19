import {Request,Response} from 'express';
import {Cotizacion } from '../configuracion/Sequelize';

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
                content: 'No se encontro al Cotizacion'
            })
        }
    })
}
export let postCotizacion=(req:Request,res:Response)=>{
    let objCotizacion=Cotizacion.build(req.body);
    objCotizacion.save().then((objCotizacionCreado:any)=>{
        res.status(201).json(
            {
                ok:true,
                contenido:objCotizacionCreado,
                mensaje:"Cotizacion Creado correctamente"
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
            coti_nom: req.body.Cotizacion.coti_nom,
            coti_igv: req.body.Cotizacion.coti_igv,
            coti_fech: req.body.Cotizacion.coti_fech,
            coti_nro: req.body.Cotizacion.coti_nro,
            coti_RUC:req.body.Cotizacion.coti_RUC
        },
        {
            where:{
                coti_id:req.body.Cotizacion.coti_id
            }
        }).then(()=>{
            
            Cotizacion.findByPk(req.body.Cotizacion.coti_id).then((objCotizacion:any)=>{
                res.status(200).json({
                    message:'ok',
                    content:objCotizacion
                })
            })
        }).catch((error:any)=>{
            res.status(501).json({
                message:'error',
                content:error
            })
        })
}

export let deleteCotizacion = (req: Request, res: Response) => {
    let {id} = req.params;

    Cotizacion.destroy({
        where:{
            coti_id:id
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"Cotizacion Eliminado",
                id:id
            }
            res.status(200).send(rpta);
        }else{
            let rpta = {
                success:false,
                message:'No se ha Eliminado',
                id:''
            }
            res.status(500).send(rpta);
        }
    })
}