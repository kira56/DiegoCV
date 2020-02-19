import { Request, Response } from 'express';
import { Usuario } from '../configuracion/Sequelize';

export let getUsuario=(req:Request,res:Response)=>{
    Usuario.findAll().then((objUsuario:any)=>{
        res.status(200).json({
            mensaje:'OK',
            contenido:objUsuario
        })
    })
}
export let getUsuarioById = (req: Request, res: Response) => {
    Usuario.findByPk(req.params.id).then((objUsuario: any) => {
        if (objUsuario) {
            res.status(200).json({
                message: 'Usuario encontrado ',
                usuario: objUsuario
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al usuario'
            })
        }
    })
}
export let postUsuario = (req: Request, res: Response) => {
    let objUsuario = Usuario.build(req.body.usuario);
    objUsuario.setSaltYHash(req.body.usuario.usu_pass);
    // save()=> promesa que GUARDA el registro en la Base de Datos
    objUsuario.save().then((usuarioCreado: any) => {
        Usuario.findByPk(usuarioCreado.usu_id).then((usuarioEncontrado: any) => {
            res.status(201).json({
                message: 'Usuario creado',
                content: usuarioEncontrado
            })
        })
    }).catch((error: any) => {
        res.status(501).json({
            message: 'Error',
            content: error
        })
    })
}
export let updateUsuario = (req: Request, res: Response) => {
    Usuario.update(
        {
            usu_nom: req.body.usuario.usu_nom
        },
        {
            where: {
                usu_id: req.body.usuario.usu_id
            }
        }).then((usuActualizado: any) => {
            Usuario.findByPk(usuActualizado[0]).then((objUsuario: any) => {
                res.status(200).json({
                    message: 'ok',
                    content: objUsuario
                })
            })
        }).catch((error: any) => {
            res.status(501).json({
                message: 'error',
                content: error
            })
        })
}
export let deleteUsuario = (req: Request, res: Response) => {
    let {id_usuario} = req.params;

    Usuario.destroy({
        where:{
            usu_id:id_usuario
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"Usuario Eliminado",
                content:cantidad
            }
            res.status(200).send(rpta);
        }else{
            let rpta = {
                success:false,
                message:'No se ha Eliminado',
                content:''
            }
            res.status(500).send(rpta);
        }
    })
}
export let iniciarSesion = (req: Request, res: Response) => {
    let {usu_email, usu_pass} = req.body;
    // tenemos que encriptar la contraseñe en hexadecimal
    let buff = Buffer.from(usu_pass,'utf-8').toString('ascii');
    Usuario.findOne({
        where: {
            usu_email
            // usu_email: usu_email
        }
    }).then((objUsuario:any)=>{
        if(objUsuario){
            let validarPass = objUsuario.validPass(buff);
            if(validarPass){
                let token = objUsuario.generarJWT();
                res.status(200).json({
                    message:'Ok',
                    token,
                    contenido:objUsuario
                })
            }else{
                res.status(500).json({
                    message:'error',
                    valid: 0,
                    content:'Usuario o contraseña incorrectos.'
                })
            }

        }else{
            res.status(500).json({
                message: 'error',
                findUser: 0,
                content: 'No se encontro el usuario'
            })
        }
    })
 }
export let getUsuarioByEmail = (req: Request, res: Response) => {
    Usuario.findAll({
        where: {
          usu_email: req.params.email
        }
      }).then((resultado: any) => {
        res.status(200).json({
          message: 'ok',
          contenido: resultado
        })
      })
}