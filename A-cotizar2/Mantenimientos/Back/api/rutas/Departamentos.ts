import { Router } from 'express';
import { getDepartamento, postDepartamento, getDepartamentoById, updateDepartamento, deleteDepartamento } from '../controladores/Departamento';


export let departamentos_router=Router();

departamentos_router.get('/dpto',getDepartamento);
departamentos_router.post('/dpto',postDepartamento);
departamentos_router.get('/dpto/:id',getDepartamentoById);
departamentos_router.put('/dpto',updateDepartamento);
departamentos_router.delete('/dpto/:id',deleteDepartamento)