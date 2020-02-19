import { Router } from 'express';
import { getDistrito, postDistrito, getDistritoById, updateDistrito, deleteDistrito } from '../controladores/Distrito';


export let distrito_router=Router();

distrito_router.get('/distrito',getDistrito);
distrito_router.post('/distrito',postDistrito);
distrito_router.get('/distrito/:id',getDistritoById);
distrito_router.put('/distrito',updateDistrito);
distrito_router.delete('/distrito/:id',deleteDistrito)