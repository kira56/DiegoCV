import { Request, Response } from "express";
import {
  CotizacionEntidad,
  CotizacionEntidadDetalle
} from "../configuracion/Sequelize";
import {
  CotizacionDetalle,
  Cotizacion,
  conexion,
  Entidad,
  ProductoEntidadPrecio,
  Categoria
} from "../configuracion/Sequelize";
const Sequelize = require("sequelize");
const op = Sequelize.Op;

export let getCotizacionDetalle = (req: Request, res: Response) => {
  CotizacionDetalle.findAll().then((objCotizacionDetalle: any) => {
    res.status(200).json({
      mensaje: "OK",
      contenido: objCotizacionDetalle
    });
  });
};

let crearCotizacionesDetalles = async (
  cabecera: any,
  arrCotizacionesDetalles: Array<any>
) => {
  const t = await conexion.transaction();
  try {
    let cabeceraCreada = await Cotizacion.create(cabecera, { transaction: t });
    let cotizacionesDetalleCreadas = [];
    for (let i = 0; i < arrCotizacionesDetalles.length; i++) {
      arrCotizacionesDetalles[i].coti_id = cabeceraCreada.coti_id;
      let objCotizacionDetalleCreadaTmp = await CotizacionDetalle.create(
        arrCotizacionesDetalles[i],
        { transaction: t }
      );
      cotizacionesDetalleCreadas.push(objCotizacionDetalleCreadaTmp);
    }

    let prod_ids = cotizacionesDetalleCreadas.map(cd => cd.prod_id);

    let entidades = await Entidad.findAll({
      attributes: ["ent_id", "ent_rz"],
      include: [
        {
          model: ProductoEntidadPrecio,
          attributes: ["prod_id"],
          where: {
            prod_id: {
              [op.or]: prod_ids
            }
          }
        }
      ]
    });

    for (let i = 0; i < entidades.length; i++) {
      let cotizacionEntidadCreada = await CotizacionEntidad.create(
        {
          ent_id: entidades[i].ent_id,
          cot_id: cabeceraCreada.cot_id,
          cotient_fech: "2020-01-29 23:19:00",
          cotient_est: "pendiente",
          cotient_vali: 0
        },
        { transaction: t }
      );

      for (let j = 0; j < entidades[i].t_productosentidadprecios.length; j++) {
        console.log(entidades[i].t_productosentidadprecios[j].prod_id);
        console.log(arrCotizacionesDetalles);

        let objCotizacionDetalle = arrCotizacionesDetalles.find(cdc => {
          return (
            entidades[i].t_productosentidadprecios[j].prod_id == cdc.prod_id
          );
        });
        console.log("/////////////////////////////////");
        console.log(objCotizacionDetalle);

        console.log("/////////////////////////////////");

        await CotizacionEntidadDetalle.create(
          {
            cotient_id: cotizacionEntidadCreada.cotient_id,
            cotiedet_prec: 0,
            cotie_cant: objCotizacionDetalle.cdet_cant,
            prod_id: entidades[i].t_productosentidadprecios[j].prod_id
          },
          { transaction: t }
        );
      }
    }

    await t.commit();
    return true;
  } catch (error) {
    console.log(error);

    await t.rollback();
    throw error;
  }
};

export let postCotizacionDetalle = (req: Request, res: Response) => {
  // [{},{}]
  console.log(req.body);

  crearCotizacionesDetalles(req.body.cabecera, req.body.cotizacion)
    .then(() => {
      res.status(201).json({
        ok: true,
        mensaje: "CotizacionDetalles Creadas correctamentes"
      });
    })
    .catch(error => {
      res.status(500).json({
        ok: true,
        contenido: error,
        mensaje: "Error interno en el servidor"
      });
    });
};

export let getProveedorByIdProducto = (req: Request, res: Response) => {
  // Buscar todos los proveedores que tengan el prod_id en t_productosentidadprecio
  //  arregloDeProveedores
  //  crear un arreglo de  t_cotizacionentidad
  // usar el id de la entidad y el id del objCotaizacionCreado
  // BUSCAR QUE PROVEEDORES
  // 1-
  // ProductoEntidadPrecio.findAll({
  //     where: {
  //         prod_id: req.params.id
  //     }
  // }).then((resultado: any) => {
  //     res.status(200).json({
  //         message: 'ok',
  //         content: resultado
  //     })
  // })
  // User.findAll({ attributes: ['firstname', 'lastname', 'email', 'pass'] })
};

export let getDetalleCotizDet = (req: Request, res: Response) =>{
  CotizacionEntidadDetalle.findAll({
        where: {
            cotient_id: req.params.id
        }
    }).then((resultado: any) => {
        res.status(200).json({
            message: 'ok',
            content: resultado
        })
    })
}
