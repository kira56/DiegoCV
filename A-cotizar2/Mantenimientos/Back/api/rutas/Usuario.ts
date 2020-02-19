import { Router } from 'express';
import { crearUsuarioCliente, getUsuario, updateUsuario, getUsuarioById, deleteUsuario, crearUsuarioProveedor, iniciarSesion } from '../controladores/Usuario';
export let usuario_router=Router();

usuario_router.post('/usuario/registrar',crearUsuarioCliente);
usuario_router.post('/usuario/registrar2',crearUsuarioProveedor);
usuario_router.get('/usuario', getUsuario);
usuario_router.get('/usuario/:id',getUsuarioById);
usuario_router.put('/usuario',updateUsuario);
usuario_router.post('/usuario/loggin',iniciarSesion);
usuario_router.delete('/usuario/:id_usuario',deleteUsuario);