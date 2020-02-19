import {Request,Response} from 'express';
import {CotizacionDetalle } from '../configuracion/Sequelize';

export let getCotizacionDetalle=(req:Request,res:Response)=>{
    CotizacionDetalle.findAll().then((objCotizacionDetalle:any)=>{
        res.status(200).json({
            mensaje:'OK',
            contenido:objCotizacionDetalle
        })
    })
}
export let getCotizacionDetalleById = (req: Request, res: Response) => {
    CotizacionDetalle.findByPk(req.params.id).then((objCotizacionDetalle: any) => {
        if (objCotizacionDetalle) {
            res.status(200).json({
                message: 'CotizacionDetalle encontrado ',
                CotizacionDetalle: objCotizacionDetalle
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al CotizacionDetalle'
            })
        }
    })
}
export let postCotizacionDetalle=(req:Request,res:Response)=>{
    let objCotizacionDetalle=CotizacionDetalle.build(req.body);
    objCotizacionDetalle.save().then((objCotizacionDetalleCreado:any)=>{
        res.status(201).json(
            {
                ok:true,
                contenido:objCotizacionDetalleCreado,
                mensaje:"CotizacionDetalle Creado correctamente"
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
export let updateCotizacionDetalle = (req: Request, res: Response) => {
    CotizacionDetalle.update(
        {
            detcot_precio: req.body.CotizacionDetalle.detcot_precio,
            detcot_especificacion: req.body.CotizacionDetalle.detcot_especificacion,
            detcot_cantidad: req.body.CotizacionDetalle.detcot_cantidad
        },
        {
            where:{
                detcot_id:req.body.CotizacionDetalle.detcot_id
            }
        }).then(()=>{
            
            CotizacionDetalle.findByPk(req.body.CotizacionDetalle.dist_id).then((objCotizacionDetalle:any)=>{
                res.status(200).json({
                    message:'ok',
                    content:objCotizacionDetalle
                })
            })
        }).catch((error:any)=>{
            res.status(501).json({
                message:'error',
                content:error
            })
        })
}

export let deleteCotizacionDetalle = (req: Request, res: Response) => {
    let {id} = req.params;

    CotizacionDetalle.destroy({
        where:{
            dist_id:id
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"CotizacionDetalle Eliminado",
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