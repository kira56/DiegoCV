import { Router } from 'express';
import { getUnidadDeMedida, postUnidadDeMedida, updateUnidadDeMedida, getUnidadDeMedidaById, deleteUnidadDeMedida } from '../controladores/Unidadmedida';

export let UnidadDeMedidas_router=Router();

UnidadDeMedidas_router.get('/unime',getUnidadDeMedida);
UnidadDeMedidas_router.post('/unime',postUnidadDeMedida);
UnidadDeMedidas_router.get('/unime/:id',getUnidadDeMedidaById);
UnidadDeMedidas_router.put('/unime',updateUnidadDeMedida);
UnidadDeMedidas_router.delete('/unime/:id',deleteUnidadDeMedida)