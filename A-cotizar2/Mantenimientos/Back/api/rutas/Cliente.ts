import { Router } from 'express';
import { getCliente, postCliente, getClienteById, updateCliente, deleteCliente } from '../controladores/Cliente';


export let cliente_router=Router();

cliente_router.get('/cliente',getCliente);
cliente_router.post('/cliente',postCliente);
cliente_router.get('/cliente/:id',getClienteById);
cliente_router.put('/cliente',updateCliente);
cliente_router.delete('/cliente/:id',deleteCliente)