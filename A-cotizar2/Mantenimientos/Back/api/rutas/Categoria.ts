import { Router } from 'express';
import { getCategoria, postCategoria, updateCategoria, getCategoriaById, deleteCategoria } from '../controladores/Categorias';

export let categorias_router=Router();

categorias_router.get('/categoria',getCategoria);
categorias_router.post('/categoria',postCategoria);
categorias_router.get('/categoria/:id',getCategoriaById);
categorias_router.put('/categoria',updateCategoria);
categorias_router.delete('/categoria/:id',deleteCategoria)