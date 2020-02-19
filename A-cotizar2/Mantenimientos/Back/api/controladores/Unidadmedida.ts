import {Request,Response} from 'express';
import { UnidadDeMedida } from '../configuracion/Sequelize'

export let getUnidadDeMedida=(req:Request,res:Response)=>{
    UnidadDeMedida.findAll().then((objUnidadDeMedida:any)=>{
        res.status(200).json({
            mensaje:'OK',
            contenido:objUnidadDeMedida
        })
    })
}
export let getUnidadDeMedidaById = (req: Request, res: Response) => {
    UnidadDeMedida.findByPk(req.params.id).then((objUnidadDeMedida: any) => {
        if (objUnidadDeMedida) {
            res.status(200).json({
                message: 'UnidadDeMedida encontrado ',
                UnidadDeMedida: objUnidadDeMedida
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al UnidadDeMedida'
            })
        }
    })
}
export let postUnidadDeMedida=(req:Request,res:Response)=>{
    let objUnidadDeMedida=UnidadDeMedida.build(req.body);
    objUnidadDeMedida.save().then((objUnidadDeMedidaCreado:any)=>{
        res.status(201).json(
            {
                ok:true,
                contenido:objUnidadDeMedidaCreado,
                mensaje:"UnidadDeMedida Creada correctamente"
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
export let updateUnidadDeMedida = (req: Request, res: Response) => {
    UnidadDeMedida.update(
        {
            um_nom: req.body.UnidadDeMedida.um_nom
        },
        {
            where:{
                um_id:req.body.UnidadDeMedida.um_id
            }
        }).then(()=>{
            
            UnidadDeMedida.findByPk(req.body.UnidadDeMedida.um_id).then((objUnidadDeMedida:any)=>{
                res.status(200).json({
                    message:'ok',
                    content:objUnidadDeMedida
                })
            })
        }).catch((error:any)=>{
            res.status(501).json({
                message:'error',
                content:error
            })
        })
}

export let deleteUnidadDeMedida = (req: Request, res: Response) => {
    let {id} = req.params;

    UnidadDeMedida.destroy({
        where:{
            um_id:id
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"UnidadDeMedida Eliminado",
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