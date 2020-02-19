import { DataTypes } from 'sequelize';
const crypto = require('crypto');
var jwt = require('jsonwebtoken');

export let Usuario_model = (sequelize: any) => {

    let Usuario = sequelize.define('t_usuario', {
        usu_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        usu_email: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        usu_hash: {
            type: DataTypes.TEXT,
        },
        usu_salt: {
            type: DataTypes.TEXT,
        },
        usu_est: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        usu_tipo: {
            type: DataTypes.STRING(45),
            allowNull: true
        }
    }, {
        tableName: 't_usuario',
        timestamps: true
    });
    Usuario.prototype.setSaltYHash = function (password: any) {
        this.usu_salt = crypto.randomBytes(16).toString('hex');
        this.usu_hash = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
    }
    Usuario.prototype.validPass = function (password: any) {
        let usu_hash_temp = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex')
        return usu_hash_temp === this.usu_hash;
    }
    Usuario.prototype.generarJWT = function () {
        let payload = {
            usu_id: this.usu_id,
            usu_nom: `${this.usu_nom} ${this.usu_ape}`
        }
        let token = jwt.sign(payload, 'contrasena', { expiresIn: '1h' }, { algorithm: 'RS256' })
        return token;
    }

    return Usuario;

}