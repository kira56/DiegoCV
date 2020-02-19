import { Router } from 'express';
import { getProvincia, posProvincia, updateProvincia, getProvinciaById, deleteProvincia } from '../controlador/Provincia';

export let provincia_router=Router();

provincia_router.get('/categoria',getProvincia);
provincia_router.post('/categoria',posProvincia);
provincia_router.get('/categoria/:id',getProvinciaById);
provincia_router.put('/categoria',updateProvincia);
provincia_router.delete('/categoria/:id',deleteProvincia);