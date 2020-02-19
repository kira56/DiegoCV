import { Router } from 'express';
import { getSubCategoria, postSubCategoria, getSubCategoriaById, updateSubCategoria, deleteSubCategoria } from '../controladores/SubCategoria';


export let subcategoria_router=Router();

subcategoria_router.get('/subcategoria',getSubCategoria);
subcategoria_router.post('/subcategoria',postSubCategoria);
subcategoria_router.get('/subcategoria/:id',getSubCategoriaById);
subcategoria_router.put('/subcategoria',updateSubCategoria);
subcategoria_router.delete('/subcategoria/:id',deleteSubCategoria)