import { Router } from 'express';
import { getCategoria, posCategoria, updateCategoria, getCategoriaById, deleteCategoria, getSubCategoriasByCategoriasId } from '../controlador/Categorias';

export let categorias_router=Router();

categorias_router.get('/categoria',getCategoria);
categorias_router.post('/categoria',posCategoria);
categorias_router.get('/categoria/:id',getCategoriaById);
categorias_router.put('/categoria',updateCategoria);
categorias_router.delete('/categoria/:id',deleteCategoria);
categorias_router.get('/categoria/:id/subcategoria',getSubCategoriasByCategoriasId);
