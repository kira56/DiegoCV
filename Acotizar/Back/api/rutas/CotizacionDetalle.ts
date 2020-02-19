import { Router } from 'express';
import { getCotizacionDetalle, postCotizacionDetalle, getProveedorByIdProducto, getDetalleCotizDet } from '../controlador/CotizacionDetalle';



export let cotizacionDetalle_router= Router();

cotizacionDetalle_router.get('/cotdet',getCotizacionDetalle);
cotizacionDetalle_router.post('/cotdet',postCotizacionDetalle);
cotizacionDetalle_router.get('/cotdet/entidad/:id',getProveedorByIdProducto);
cotizacionDetalle_router.get('/cotdet/detalle/cotizacion/:id',getDetalleCotizDet)
