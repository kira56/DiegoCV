import {Request,Response} from 'express';
import { CotizacionEntidad } from '../configuracion/Sequelize';
const Sequelize=require('sequelize');
const Op=Sequelize.Op;

export let getCotizacionEntidad=(req:Request,res:Response)=>{
    CotizacionEntidad.findAll().then((objCotizacionEntidad:any)=>{
        res.status(200).json({
            mensaje:'OK',
            contenido:objCotizacionEntidad
        })
    })
}
export let getCotizacionEntidadById = (req: Request, res: Response) => {
    CotizacionEntidad.findByPk(req.params.id).then((objCotizacionEntidad: any) => {
        if (objCotizacionEntidad) {
            res.status(200).json({
                message: 'CotizacionEntidad encontrado ',
                CotizacionEntidad: objCotizacionEntidad
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro la CotizacionEntidad'
            })
        }
    })
}
export let getCotizacionEntidadByEstado = (req: Request, res: Response)=> {
    // console.log(req.params.);
    
    CotizacionEntidad.findAll({
        where: {
            // [Op.and]: [{ ent_id: req.params.ident }, { cotient_est: req.params.est }],
            cotient_est: req.params.est
        }
      }).then((resultado: any) => {
        res.status(200).json({
          message: 'ok',
          contenido: resultado
        })
      })
}