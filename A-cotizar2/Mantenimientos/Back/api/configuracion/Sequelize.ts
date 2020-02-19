import { Categorias_model } from '../modelos/Categoria';
import { Departamentos_model } from '../modelos/Departamento';
import { SubCategoria_model } from '../modelos/SubCategoria';
import { Usuario_model } from '../modelos/Usuario';
import { Cliente_model } from '../modelos/Cliente';
import { Distrito_model } from '../modelos/Distrito';
import { Provincia_model } from '../modelos/Provincia';
import { UnidadMedida_model } from '../modelos/UnidadMedida';
import { Cotizacion_model } from '../modelos/Cotizacion';
import { DetalleCotizacion_model } from '../modelos/DetalleCotizacion';
import { Proveedor_model } from '../modelos/Proveedor';
import { UsuariohasCotizacion_model } from '../modelos/UsuariohasCotizacion';
import { CategoriashasProveedor_model } from '../modelos/CategoriahasProveedor';
import { DetalleHasUnidad_model } from '../modelos/DetCotizahasUniMedida';
import { ProveeHasCotizacion_model } from '../modelos/ProveeHasCotizacion';

const Sequelize=require('sequelize');
export const conexion=new Sequelize("a-cotizar","root","root", {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-05:00',
    // configuración para lectura de fechas en la base de datos
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: true
    }
});
export const Cotizacion:any=Cotizacion_model(conexion);
export const CotizacionDetalle:any=DetalleCotizacion_model(conexion);
export const Departamento:any=Departamentos_model(conexion);
export const Provincia:any=Provincia_model(conexion);
export const Categoria:any = Categorias_model(conexion);
export const Distrito:any = Distrito_model(conexion);
export const SubCategoria:any = SubCategoria_model(conexion);
export const Cliente:any = Cliente_model(conexion);
export const Proveedor:any = Proveedor_model(conexion);
export const Usuario:any = Usuario_model(conexion);
export const UnidadDeMedida:any = UnidadMedida_model(conexion);
export const UsuariohasCotizacion: any=UsuariohasCotizacion_model(conexion);
export const CategoriashasProveedor: any=CategoriashasProveedor_model(conexion);
export const DetalleHasUnidad: any=DetalleHasUnidad_model(conexion);
/* export const ProveeHasCotizacion:any=ProveeHasCotizacion_model(conexion);
 */
// RELACIONES

Categoria.hasMany(SubCategoria,{foreignKey:"cat_id"});
SubCategoria.belongsTo(Categoria,{foreignKey:"cat_id"});
Categoria.hasMany(CategoriashasProveedor,{foreignKey:"cat_id"});
CategoriashasProveedor.belongsTo(Categoria,{foreignKey:"cat_id"});
Departamento.hasMany(Provincia,{foreignKey:"dept_id"});
Provincia.belongsTo(Departamento,{foreignKey:"dept_id"});
Provincia.hasMany(Distrito,{foreignKey:"pro_id"});
Distrito.belongsTo(Provincia,{foreignKey:"pro_id"});
Cliente.hasMany(Usuario,{foreignKey:"cli_id"});
Usuario.belongsTo(Cliente,{foreignKey:"cli_id"});
Proveedor.hasMany(Usuario,{foreignKey:"prov_id"});
Usuario.belongsTo(Proveedor,{foreignKey:"prov_id"});
Usuario.hasMany(UsuariohasCotizacion,{foreignKey:"usu_id"});
UsuariohasCotizacion.belongsTo(Usuario,{foreignKey:"usu_id"});
Cotizacion.hasMany(UsuariohasCotizacion,{foreignKey:"coti_id"});
UsuariohasCotizacion.belongsTo(Cotizacion,{foreignKey:"coti_id"});
Proveedor.hasMany(CategoriashasProveedor,{foreignKey:"prov_id"});
CategoriashasProveedor.belongsTo(Proveedor,{foreignKey:"prov_id"});
Distrito.hasMany(Proveedor,{foreignKey:"dist_id"});
Proveedor.belongsTo(Distrito,{foreignKey:"dist_id"});
CotizacionDetalle.hasMany(DetalleHasUnidad,{foreignKey:"coti_id"});
DetalleHasUnidad.belongsTo(CotizacionDetalle,{foreignKey:"coti_id"});
UnidadDeMedida.hasMany(DetalleHasUnidad,{foreignKey:"um_id"});
DetalleHasUnidad.belongsTo(UnidadDeMedida,{foreignKey:"um_id"});
Cotizacion.hasMany(CotizacionDetalle,{foreignKey:"coti_id"});
CotizacionDetalle.belongsTo(Cotizacion,{foreignKey:"coti_id"});
/* Proveedor.hasMany(ProveeHasCotizacion,{foreignKey:"prov_id"});
ProveeHasCotizacion.belongsTo(Proveedor,{foreignKey:"prov_id"});
Cotizacion.hasMany(ProveeHasCotizacion,{foreignKey:"coti_id"});
ProveeHasCotizacion.belongsTo(Cotizacion,{foreignKey:"coti_id"}); */
Distrito.hasMany(Usuario,{foreignKey:"dist_id"});
Usuario.belongsTo(Distrito,{foreignKey:"dist_id"});
Cotizacion.hasMany(Cotizacion,{foreignKey:"coti_id2"});
Cotizacion.belongsTo(Cotizacion,{foreignKey:"coti_id2"});
