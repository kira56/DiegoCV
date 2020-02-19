import { Router } from 'express';
import { getDepartamento, postDepartamento, updateDepartamento, deleteDepartamento, getDepartamentoById } from '../controlador/Departamento';

export let departamento_router=Router();
departamento_router.get('/departamento',getDepartamento);
departamento_router.post('/departamento',postDepartamento);
departamento_router.get('/departamento/:id',getDepartamentoById);
departamento_router.put('/departamento',updateDepartamento);
departamento_router.delete('/departamento/:id',deleteDepartamento);