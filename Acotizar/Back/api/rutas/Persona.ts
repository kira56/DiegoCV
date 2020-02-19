import { Router } from 'express';
import { postPersona, getPersona, updatePersona } from '../controlador/Persona';


export let persona_router= Router();
persona_router.post('/persona',postPersona);
persona_router.get('/persona',getPersona);
persona_router.put('/persona',updatePersona);