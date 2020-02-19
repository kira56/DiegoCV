import {Request,Response} from 'express';
import { Departamento } from '../configuracion/Sequelize';

export let getDepartamento=(req:Request,res:Response)=>{
    Departamento.findAll().then((objDepartamento:any)=>{
        res.status(200).json({
            mensaje:'OK',
            contenido:objDepartamento
        })
    })
}
export let getDepartamentoById = (req: Request, res: Response) => {
    Departamento.findByPk(req.params.id).then((objDepartamento: any) => {
        if (objDepartamento) {
            res.status(200).json({
                message: 'Departamento encontrado ',
                Departamento: objDepartamento
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al Departamento'
            })
        }
    })
}
export let postDepartamento=(req:Request,res:Response)=>{
    let objDepartamento=Departamento.build(req.body);
    objDepartamento.save().then((objDepartamentoCreado:any)=>{
        res.status(201).json(
            {
                ok:true,
                contenido:objDepartamentoCreado,
                mensaje:"Departamento Creada correctamente"
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
export let updateDepartamento = (req: Request, res: Response) => {
    Departamento.update(
        {
            dpto_nom: req.body.Departamento.dpto_nom
        },
        {
            where:{
                dpto_id:req.body.Departamento.dpto_id
            }
        }).then((Actualizado:any)=>{
            Departamento.findByPk(Actualizado[0]).then((objDepartamento:any)=>{
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

export let deleteDepartamento = (req: Request, res: Response) => {
    let {id} = req.params;

    Departamento.destroy({
        where:{
            dpto_id:id
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"Departamento Eliminado",
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