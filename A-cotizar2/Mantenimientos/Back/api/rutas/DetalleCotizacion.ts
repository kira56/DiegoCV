import { Router } from 'express';
import { getProvincia, postProvincia, getProvinciaById, updateProvincia, deleteProvincia } from '../controladores/Provincia';


export let detallecotizacion_router=Router();

detallecotizacion_router.get('/detcot',getProvincia);
detallecotizacion_router.post('/detcot',postProvincia);
detallecotizacion_router.get('/detcot/:id',getProvinciaById);
detallecotizacion_router.put('/detcot',updateProvincia);
detallecotizacion_router.delete('/detcot/:id',deleteProvincia);