import {Request,Response} from 'express';
import { Categoria, Cotizacion,CategoriashasProveedor } from '../configuracion/Sequelize';

export let getCategoria=(req:Request,res:Response)=>{
    Categoria.findAll().then((objCategoria:any)=>{
        res.status(200).json({
            mensaje:'OK',
            contenido:objCategoria
        })
    })
}
export let getCategoriaById = (req: Request, res: Response) => {
    Categoria.findByPk(req.params.id).then((objCategoria: any) => {
        if (objCategoria) {
            res.status(200).json({
                message: 'Categoria encontrado ',
                Categoria: objCategoria
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al Categoria'
            })
        }
    })
}
export let postCategoria=(req:Request,res:Response)=>{
    let objCategoria=Categoria.build(req.body);
    objCategoria.save().then((objCategoriaCreado:any)=>{
        res.status(201).json(
            {
                ok:true,
                contenido:objCategoriaCreado,
                mensaje:"Categoria Creada correctamente"
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
export let updateCategoria = (req: Request, res: Response) => {
    Categoria.update(
        {
            cat_nom: req.body.Categoria.cat_nom
        },
        {
            where:{
                cat_id:req.body.Categoria.cat_id
            }
        }).then(()=>{
             
            Categoria.findByPk(req.body.Categoria.cat_id).then((objCategoria:any)=>{
                res.status(200).json({
                    message:'ok',
                    content:objCategoria
                })
            })
        }).catch((error:any)=>{
            res.status(501).json({
                message:'error',
                content:error
            })
        })
}

export let deleteCategoria = (req: Request, res: Response) => {
    let {id} = req.params;

    Categoria.destroy({
        where:{
            cat_id:id
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"Categoria Eliminado",
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