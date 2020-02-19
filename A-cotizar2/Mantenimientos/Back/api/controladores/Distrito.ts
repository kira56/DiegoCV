import {Request,Response} from 'express';
import { Distrito, Provincia, Departamento } from '../configuracion/Sequelize';

export let getDistrito=(req:Request,res:Response)=>{
    Distrito.findAll({
        include:[{
            model: Provincia,
            include:[
                {model:Departamento,
                }
            ]
        }]
    }).then((resultado:any)=>{
        res.status(200).json({
            message: 'ok',
            content: resultado
        })
    })
}
export let getDistritoById = (req: Request, res: Response) => {
    Distrito.findAll({
        where:{
           dist_id: req.params.id,
        },
        include: [{
            model:Provincia,
            include:[
                {model:Departamento,
                }
            ]
        }]
    }).then((resultado: any)=>{
        res.status(200).json({
            message: 'ok',
            content: resultado
        })
    })
}
export let postDistrito=(req:Request,res:Response)=>{
    let objDistrito=Distrito.build(req.body);
    objDistrito.save().then((objDistritoCreado:any)=>{
        res.status(201).json(
            {
                ok:true,
                contenido:objDistritoCreado,
                mensaje:"Distrito Creado correctamente"
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
   /*  Provincia.build(req.body.provincia).save().then((provCreada:any)=>{
        // Se hace la relacion para las dos tablas
        let fk_provincia= provCreada.pro_id
        let jsondist = req.body.distrito 
        jsondist.pro_id = fk_provincia
        let objDistrito = Distrito.build(req.body.distrito);
        objDistrito.save().then((distritoCreado: any) => {
            Distrito.findByPk(distritoCreado.dist_id).then((DistritoEncontrado: any) => {
                res.status(201).json({
                    message: 'Distrito creado',
                    content: DistritoEncontrado
                })
            })
        }).catch((error: any) => {
            res.status(501).json({
                message: 'Error',
                content: error
            })
        })

    }) */
}
export let updateDistrito = (req: Request, res: Response) => {
    Distrito.update(
        {
            dist_nom: req.body.Distrito.dist_nom
        },
        {
            where:{
                dist_id:req.body.Distrito.dist_id
            }
        }).then(()=>{
            
            Distrito.findByPk(req.body.Distrito.dist_id).then((objDistrito:any)=>{
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