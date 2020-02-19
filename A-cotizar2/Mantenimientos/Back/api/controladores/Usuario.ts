import { Request, Response } from 'express';
import { Usuario, Cliente, Proveedor, CategoriashasProveedor } from '../configuracion/Sequelize';
const Sequelize = require('sequelize');
const Op = Sequelize.Op; // Los operadores de comparacion de sequelize
var jwt = require('jsonwebtoken');

export let getUsuario = (req: Request, res: Response) => {
    Usuario.findAll().then((objUsuario: any) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objUsuario
        })
    })
}

export let getUsuarioById = (req: Request, res: Response) => {
    Usuario.findByPk(req.params.id).then((objUsuario: any) => {
        if (objUsuario) {
            res.status(200).json({
                message: 'Usuario encontrado ',
                Usuario: objUsuario
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al Usuario'
            })
        }
    })
}


export let crearUsuarioCliente = (req: Request, res: Response) => {
    console.log("misuario", req.body);
    Cliente.build(req.body.cliente).save().then((cliCreada: any) => {
        // Se hace la relacion para las dos tablas
        let fk_client = cliCreada.cli_id
        let jsonusu = req.body.usuario
        jsonusu.cli_id = fk_client
        let objUsuario = Usuario.build(req.body.usuario);
        objUsuario.setSaltYHash(req.body.usuario.usu_pass);
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

    })

}
export let crearUsuarioProveedor = (req: Request, res: Response) => {
    console.log("misuario", req.body);
    Proveedor.build(req.body.proveedor).save().then((provCreado: any) => {
        // Se hace la relacion para las dos tablas
        let fk_proveedor = provCreado.prov_id
        let jsonusu = req.body.usuario
        jsonusu.prov_id = fk_proveedor
        let objUsuario = Usuario.build(req.body.usuario);
        console.log(objUsuario);
        objUsuario.setSaltYHash(req.body.usuario.usu_pass);
        objUsuario.save().then((usuarioCreado: any) => {
            let jsonpcatpro = req.body.provcat
            jsonpcatpro.prov_id = fk_proveedor
            let objcatProd = CategoriashasProveedor.build(req.body.provcat);
            objcatProd.save().then((provcatCreado: any) => {
                CategoriashasProveedor.findByPk(provcatCreado.catehasprove_id).then((provcatEncontrado: any) => {
                    res.status(201).json({
                        message: 'Proveedores creado',
                        contenido: provcatEncontrado,
                        content:usuarioCreado
                    })
                })
            })
        }).catch((error: any) => {
            res.status(501).json({
                message: 'Error',
                content: error
            })
        })
        
    })
}
export let updateUsuario = (req: Request, res: Response) => {
    Usuario.update(
        {
            usu_email: req.body.Usuario.usu_email
        },
        {
            where: {
                usu_id: req.body.Usuario.usu_id
            }
        }).then(() => {

            Usuario.findByPk(req.body.Usuario.usu_id).then((objUsuario: any) => {
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

export let iniciarSesion = (req: Request, res: Response) => {
    let { usu_email, usu_pass } = req.body;
    // tenemos que encriptar la contraseñe en hexadecimal
    let buff = Buffer.from(usu_pass, 'utf-8').toString('ascii');
    Usuario.findOne({
        where: {
            usu_email: usu_email
        }
    }).then((objUsuario: any) => {
        if (objUsuario) {
            let validarPass = objUsuario.validPass(buff);
            if (validarPass) {
                let token = objUsuario.generarJWT();
                res.status(200).json({
                    message: 'Ok',
                    token,
                    usuario:objUsuario
                })
            } else {
                res.status(500).json({
                    message: 'error',
                    content: 'Usuario o contraseña incorrectos.'
                })
            }

        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro el usuario'
            })
        }
    })
}


export let deleteUsuario = (req: Request, res: Response) => {
    let { id_usuario } = req.params;
    console.log(id_usuario);

    Usuario.destroy({
        where: {
            cli_id: id_usuario
        }
    }).then((cantidad: any) => {
        return Cliente.destroy({
            where: {
                cli_id: id_usuario
            }
        });
    }).then((cantidad: any) => {
        if (cantidad > 0) {
            let rpta = {
                success: true,
                message: "Usuario Eliminado",
                id: id_usuario
            }
            res.status(200).send(rpta);
        } else {
            let rpta = {
                success: false,
                message: 'No se ha Eliminado',
                id: ''
            }
            res.status(500).send(rpta);
        }

    })
}


