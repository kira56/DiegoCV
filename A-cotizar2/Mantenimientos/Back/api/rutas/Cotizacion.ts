import { Router } from 'express';
import { postCotizacion, getCotizacion, getCotizacionById, updateCotizacion, deleteCotizacion } from '../controladores/Cotizacion';


export let cotizacion_router=Router();

cotizacion_router.get('/cotizacion',getCotizacion);
cotizacion_router.post('/cotizacion',postCotizacion);
cotizacion_router.get('/cotizacion/:id',getCotizacionById);
cotizacion_router.put('/cotizacion',updateCotizacion);
cotizacion_router.delete('/cotizacion/:id',deleteCotizacion)