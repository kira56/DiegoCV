import { Router } from 'express';
import { getProveedor, postProveedor, updateProveedor, getProveedorById, deleteProveedor } from '../controladores/Proveedor';

export let proveedor_router=Router();

proveedor_router.get('/proveedor',getProveedor);
proveedor_router.post('/proveedor',postProveedor);
proveedor_router.get('/proveedor/:id',getProveedorById);
proveedor_router.put('/proveedor',updateProveedor);
proveedor_router.delete('/proveedor/:id',deleteProveedor);