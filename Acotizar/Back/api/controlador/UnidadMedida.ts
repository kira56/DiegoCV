import {Request,Response} from 'express';
import { UnidadMedida } from '../configuracion/Sequelize';

export let getUnidadMedida=(req:Request,res:Response)=>{
    UnidadMedida.findAll().then((objUnidadMedida:any)=>{
        res.status(200).json({
            message:'Ok',
            content:objUnidadMedida
        })
    })
}

export let postUnidadMedida=(req:Request,res:Response)=>{
    let objUnidadMedida=UnidadMedida.build(req.body);
    objUnidadMedida.save().then((objProducto:any)=>{
        res.status(201).json({
            ok:true,
            contenido:objUnidadMedida,
            message:"Unidad de Medida especificadae"
        })
    }).catch((error:any)=>{
        res.status(400).json({
            ok:true,
            contenido:error,
            message:"Unidad de Medida no especificada"
        })
    })
}

export let getUnidadMedidaById = (req: Request, res: Response) => {
    UnidadMedida.findByPk(req.params.id).then((objUnidadMedida: any) => {
        if (objUnidadMedida) {
            res.status(200).json({
                message: 'UnidadMedida encontrado ',
                UnidadMedida: objUnidadMedida
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al UnidadMedida'
            })
        }
    })
}
export let posUnidadMedida=(req:Request,res:Response)=>{
    let objUnidadMedida=UnidadMedida.build(req.body);
    objUnidadMedida.save().then((objUnidadMedidaCreado:any)=>{
        res.status(201).json(
            {
                ok:true,
                contenido:objUnidadMedidaCreado,
                mensaje:"UnidadMedida Creada correctamente"
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
export let updateUnidadMedida = (req: Request, res: Response) => {
    UnidadMedida.update(
        {
            um_nom: req.body.UnidadMedida.um_nom,
            um_abr:req.body.UnidadMedida.um_abr
        },
        {
            where:{
                um_id:req.body.UnidadMedida.um_id
            }
        }).then((Actualizado:any)=>{
            UnidadMedida.findByPk(Actualizado[0]).then((objUnidadMedida:any)=>{
                res.status(200).json({
                    message:'ok',
                    content:Actualizado
                })
            })
        }).catch((error:any)=>{
            res.status(501).json({
                message:'error',
                content:error
            })
        })
}

export let deleteUnidadMedida = (req: Request, res: Response) => {
    let {id} = req.params;

    UnidadMedida.destroy({
        where:{
            um_id:id
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"UnidadMedida Eliminado",
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