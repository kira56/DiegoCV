import { Router } from 'express';
import { getCotizacionEntidad, getCotizacionEntidadById, getCotizacionEntidadByEstado } from '../controlador/CotizacionEntidad';

export let cotizacionEntidad_router= Router();

cotizacionEntidad_router.get('/cotizaent',getCotizacionEntidad);
cotizacionEntidad_router.get('/cotizaent/:id',getCotizacionEntidadById);
cotizacionEntidad_router.get('/cotizaent/estado/:est',getCotizacionEntidadByEstado);