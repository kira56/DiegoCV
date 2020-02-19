import {Request,Response} from 'express';
import { Cliente } from '../configuracion/Sequelize';

export let getCliente=(req:Request,res:Response)=>{
    Cliente.findAll().then((objCliente:any)=>{
        res.status(200).json({
            mensaje:'OK',
            contenido:objCliente
        })
    })
}
export let getClienteById = (req: Request, res: Response) => {
    Cliente.findByPk(req.params.id).then((objCliente: any) => {
        if (objCliente) {
            res.status(200).json({
                message: 'Cliente encontrado ',
                Cliente: objCliente
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al Cliente'
            })
        }
    })
}
export let postCliente=(req:Request,res:Response)=>{
    let objCliente=Cliente.build(req.body);
    objCliente.save().then((objClienteCreado:any)=>{
        res.status(201).json(
            {
                ok:true,
                contenido:objClienteCreado,
                mensaje:"Cliente Creado correctamente"
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
export let updateCliente = (req: Request, res: Response) => {
    Cliente.update(
        {
            cli_nom: req.body.Cliente.cli_nom
        },
        {
            where:{
                cli_id:req.body.Cliente.cli_id
            }
        }).then(()=>{
            
            Cliente.findByPk(req.body.Cliente.cli_id).then((objCliente:any)=>{
                res.status(200).json({
                    message:'ok',
                    content:objCliente
                })
            })
        }).catch((error:any)=>{
            res.status(501).json({
                message:'error',
                content:error
            })
        })
}

export let deleteCliente = (req: Request, res: Response) => {
    let {id} = req.params;

    Cliente.destroy({
        where:{
            cli_id:id
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"Cliente Eliminado",
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