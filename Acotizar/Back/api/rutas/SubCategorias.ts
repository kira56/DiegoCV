import { Router } from 'express';
import { getSubCategoria, posSubCategoria, updateSubCategoria, getSubCategoriaById, deleteSubCategoria, scatbycatid } from '../controlador/SubCategoria';


export let Subcategorias_router=Router();

Subcategorias_router.get('/subcategoria',getSubCategoria);
Subcategorias_router.post('/subcategoria',posSubCategoria);
Subcategorias_router.get('/subcategoria/:id',getSubCategoriaById);

Subcategorias_router.put('/subcategoria',updateSubCategoria);
Subcategorias_router.delete('/subcategoria/:id',deleteSubCategoria);

Subcategorias_router.get('/subcategorias/:id',scatbycatid);
