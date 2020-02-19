import {Request,Response} from 'express';
import { SubCategoria } from '../configuracion/Sequelize';

export let getSubCategoria=(req:Request,res:Response)=>{
    SubCategoria.findAll().then((objCategoria:any)=>{
        res.status(200).json({
            mensaje:'OK',
            contenido:objCategoria
        })
    })
}
export let getSubCategoriaById = (req: Request, res: Response) => {
    SubCategoria.findByPk(req.params.id).then((objSubCategoria: any) => {
        if (objSubCategoria) {
            res.status(200).json({
                message: 'Sub Categoria encontrado ',
                SubCategoria: objSubCategoria
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro la Sub Categoria'
            })
        }
    })
}
export let posSubCategoria=(req:Request,res:Response)=>{
    let objSubCategoria=SubCategoria.build(req.body);
    objSubCategoria.save().then((objSubCategoriaCreado:any)=>{
        res.status(201).json(
            {
                ok:true,
                contenido:objSubCategoriaCreado,
                mensaje:"SubCategoria Creada correctamente"
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
export let updateSubCategoria = (req: Request, res: Response) => {
    SubCategoria.update(
        {
            scat_nom: req.body.SubCategoria.scat_nom,
            cat_id: req.body.SubCategoria.cat_id
        },
        {
            where:{
                scat_id:req.body.SubCategoria.scat_id
            }
        }).then((Actualizado:any)=>{
            SubCategoria.findByPk(Actualizado[0]).then((objSubCategoria:any)=>{
                res.status(200).json({
                    message:'ok',
                    content:objSubCategoria

                })
            })
        }).catch((error:any)=>{
            res.status(501).json({
                message:'error',
                content:error
            })
        })
}

export let deleteSubCategoria = (req: Request, res: Response) => {
    let {id} = req.params;

    SubCategoria.destroy({
        where:{
            scat_id:id
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"Sub Categoria Eliminado",
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
export let scatbycatid=(req: Request, res: Response)=>{
    
        SubCategoria.findAll({
            where: {
              cat_id: req.params.id
            }
          }).then((resultado: any) => {
            res.status(200).json({
              message: 'ok',
              content: resultado
            })
          })
    
}