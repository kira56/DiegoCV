import { Router } from 'express';
import { getCotizacion, postCotizacion, getCotizacionByEstado } from '../controlador/Cotizacion';


export let cotizacion_router=Router();

cotizacion_router.get('/cotizacion',getCotizacion);
cotizacion_router.post('/cotizacion',postCotizacion);
cotizacion_router.get('/cotizacion/estado/:est',getCotizacionByEstado);
