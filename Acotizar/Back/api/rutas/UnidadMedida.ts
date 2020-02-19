import { Router } from 'express';
import { postUnidadMedida, getUnidadMedida, getUnidadMedidaById, updateUnidadMedida, deleteUnidadMedida } from '../controlador/UnidadMedida';

export let um_router=Router();
um_router.post('/um', postUnidadMedida);
um_router.get('/um', getUnidadMedida);
um_router.get('/um/:id', getUnidadMedidaById);
um_router.put('/um',updateUnidadMedida);
um_router.delete('/um/:id',deleteUnidadMedida);