import { Request, Response } from 'express';
import { conexion, ProductoEntidadPrecio } from '../configuracion/Sequelize';

let crearProductoEntidad = async (arrProductoEntidad: Array<any>) => {

    const t = await conexion.transaction();
    try {
        for (let i = 0; i < arrProductoEntidad.length; i++) {
            await ProductoEntidadPrecio.create(arrProductoEntidad[i], { transaction: t });
        }
        await t.commit();
        return true;
    } catch (error) {
        console.log(error);
        
        await t.rollback();
        throw error;
    }
}

export let postProductoEntidad = (req: Request, res: Response) => {
    // [{},{}]
    console.log(req.body);
    
    crearProductoEntidad(req.body).then(() => {
        res.status(201).json(
            {
                ok: true,
                mensaje: "CotizacionDetalles Creadas correctamentes"
            }
        )
    }).catch((error) => {
        res.status(500).json(
            {
                ok: true,
                contenido: error,
                mensaje: "Error interno en el servidor"
            }
        )
    })
}

