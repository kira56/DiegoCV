import { Router } from 'express';
import { getProvincia, postProvincia, getProvinciaById, updateProvincia, deleteProvincia } from '../controladores/Provincia';


export let provincia_router=Router();

provincia_router.get('/provincia',getProvincia);
provincia_router.post('/provincia',postProvincia);
provincia_router.get('/provincia/:id',getProvinciaById);
provincia_router.put('/provincia',updateProvincia);
provincia_router.delete('/provincia/:id',deleteProvincia);