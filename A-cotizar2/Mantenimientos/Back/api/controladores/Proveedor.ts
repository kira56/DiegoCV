import {Request,Response} from 'express';
import { Proveedor, CategoriashasProveedor} from '../configuracion/Sequelize';

export let getProveedor=(req:Request,res:Response)=>{
    Proveedor.findAll().then((objProveedor:any)=>{
        res.status(200).json({
            mensaje:'OK',
            contenido:objProveedor
        })
    })
}
export let getProveedorById = (req: Request, res: Response) => {
    Proveedor.findByPk(req.params.id).then((objProveedor: any) => {
        if (objProveedor) {
            res.status(200).json({
                message: 'Proveedor encontrado ',
                Proveedor: objProveedor
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al Proveedor'
            })
        }
    })
}
export let postProveedor=(req:Request,res:Response)=>{
    Proveedor.build(req.body.proveedor).save().then((provCreada:any)=>{
        // Se hace la relacion para las dos tablas
        let fk_provcat= provCreada.prov_id
        console.log("dd",fk_provcat);
        let jsonpcat = req.body.provcat
        jsonpcat.prov_id = fk_provcat
        let objcatProd = CategoriashasProveedor.build(req.body.provcat);
        objcatProd.save().then((provcatCreado: any) => {
            CategoriashasProveedor.findByPk(provcatCreado.catehasprove_id).then((provcatEncontrado: any) => {
                res.status(201).json({
                    message: 'Proveedores creado',
                    content: provcatEncontrado
                })
            })
        }).catch((error: any) => {
            res.status(501).json({
                message: 'Error',
                content: error
            })
        })

    })
}

export let updateProveedor = (req: Request, res: Response) => {
    Proveedor.update(
        {
            prov_rz: req.body.Proveedor.prov_rz,
            prov_RUC: req.body.Proveedor.prov_RUC,
            prov_pweb: req.body.Proveedor.prov_pweb,
            prov_dir: req.body.Proveedor.prov_dir,
            prov_nom: req.body.Proveedor.prov_nom,
        },
        {
            where:{
                prov_id:req.body.Proveedor.prov_id
            }
        }).then(()=>{
            
            Proveedor.findByPk(req.body.Proveedor.prov_id).then((objProveedor:any)=>{
                res.status(200).json({
                    message:'ok',
                    content:objProveedor
                })
            })
        }).catch((error:any)=>{
            res.status(501).json({
                message:'error',
                content:error
            })
        })
}

export let deleteProveedor = (req: Request, res: Response) => {
    let {id} = req.params;

    Proveedor.destroy({
        where:{
            prov_id:id
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"Proveedor Eliminado",
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