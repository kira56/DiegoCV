import { Router } from 'express';
import { postProductoEntidad } from '../controlador/ProductoEntidad';

export let productoEntidad_router = Router();
productoEntidad_router.post('/prodent',postProductoEntidad);