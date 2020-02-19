import {Request,Response} from 'express';
import { Distrito } from '../configuracion/Sequelize';

export let getDistrito=(req:Request,res:Response)=>{
    Distrito.findAll().then((objDistrito:any)=>{
        res.status(200).json({
            mensaje:'OK',
            contenido:objDistrito
        })
    })
}
export let getDistritoById = (req: Request, res: Response) => {
    Distrito.findByPk(req.params.id).then((objDistrito: any) => {
        if (objDistrito) {
            res.status(200).json({
                message: 'Distrito encontrado ',
                Distrito: objDistrito
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al Distrito'
            })
        }
    })
}
export let postDistrito=(req:Request,res:Response)=>{
    let objDistrito=Distrito.build(req.body);
    objDistrito.save().then((objDistritoCreado:any)=>{
        res.status(201).json(
            {
                ok:true,
                contenido:objDistritoCreado,
                mensaje:"Distrito Creada correctamente"
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
export let updateDistrito = (req: Request, res: Response) => {
    Distrito.update(
        {
            dist_nom: req.body.Distrito.dist_nom,
            prov_id: req.body.Distrito.prov_id
        },
        {
            where:{
                dist_id:req.body.Distrito.dist_id
            }
        }).then((Actualizado:any)=>{
            Distrito.findByPk(Actualizado[0]).then((objDistrito:any)=>{
                res.status(200).json({
                    message:'ok',
                    content:objDistrito

                })
            })
        }).catch((error:any)=>{
            res.status(501).json({
                message:'error',
                content:error
            })
        })
}
export let deleteDistrito = (req: Request, res: Response) => {
    let {id} = req.params;

    Distrito.destroy({
        where:{
            dist_id:id
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"Distrito Eliminado",
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