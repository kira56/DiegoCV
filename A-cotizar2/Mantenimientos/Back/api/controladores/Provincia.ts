import {Request,Response} from 'express';
import { Provincia } from '../configuracion/Sequelize';

export let getProvincia=(req:Request,res:Response)=>{
    Provincia.findAll().then((objProvincia:any)=>{
        res.status(200).json({
            mensaje:'OK',
            contenido:objProvincia
        })
    })
}
export let getProvinciaById = (req: Request, res: Response) => {
    Provincia.findByPk(req.params.id).then((objProvincia: any) => {
        if (objProvincia) {
            res.status(200).json({
                message: 'Provincia encontrado ',
                Provincia: objProvincia
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al Provincia'
            })
        }
    })
}
export let postProvincia=(req:Request,res:Response)=>{
    let objProvincia=Provincia.build(req.body);
    objProvincia.save().then((objProvinciaCreado:any)=>{
        res.status(201).json(
            {
                ok:true,
                contenido:objProvinciaCreado,
                mensaje:"Provincia Creado correctamente"
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
export let updateProvincia = (req: Request, res: Response) => {
    Provincia.update(
        {
            pro_nom: req.body.Provincia.pro_nom
        },
        {
            where:{
                pro_id:req.body.Provincia.pro_id
            }
        }).then(()=>{
            
            Provincia.findByPk(req.body.Provincia.pro_id).then((objProvincia:any)=>{
                res.status(200).json({
                    message:'ok',
                    content:objProvincia
                })
            })
        }).catch((error:any)=>{
            res.status(501).json({
                message:'error',
                content:error
            })
        })
}

export let deleteProvincia = (req: Request, res: Response) => {
    let {id} = req.params;

    Provincia.destroy({
        where:{
            pro_id:id
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"Provincia Eliminado",
                id:id
            }
            res.status(200).send(rpta);
        }else{
            let rpta = {
                success:false,
                message:'Provnicia no se ha Eliminado',
                id:''
            }
            res.status(500).send(rpta);
        }
    })
}