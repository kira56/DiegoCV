import { entidad_model } from '../modelos/Entidad';
import { Categorias_model } from '../modelos/Categoria';
import { SubCategoria_model } from '../modelos/SubCategoria';
import { Cotizacion_model } from '../modelos/Cotizacion';
import { CotizacionEntidad_model } from '../modelos/CotizacionEntidad';
import { Departamento_model } from '../modelos/Departamento';
import { CotizacionEntidadDetalle_model } from '../modelos/CotizaacionEntidadDetalle';
import { Distrito_model } from '../modelos/Distrito';
import { persona_model } from '../modelos/Persona';
import { personaEntidad_model } from '../modelos/PersonaEntidad';
import { producto_model } from '../modelos/producto';
import { productoentidadprecio_model } from '../modelos/productosentidadprecio';
import { provincia_model } from '../modelos/Provincia';
import { unidadMedida_model } from '../modelos/UnidadMedida';
import { usuario_model } from '../modelos/Usuario';
import { cotizacionDetalle_model } from '../modelos/CotizacionDetalle';
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
export const CotizacionDetalle:any=cotizacionDetalle_model(conexion);
export const CotizacionEntidad:any=CotizacionEntidad_model(conexion);
export const CotizacionEntidadDetalle:any=CotizacionEntidadDetalle_model(conexion);

export const Producto:any=producto_model(conexion);
export const ProductoEntidadPrecio:any=productoentidadprecio_model(conexion);
export const UnidadMedida:any=unidadMedida_model(conexion);
export const Categoria:any = Categorias_model(conexion);
export const SubCategoria:any=SubCategoria_model(conexion);

export const Departamento:any=Departamento_model(conexion);
export const Provincia:any=provincia_model(conexion);
export const Distrito:any=Distrito_model(conexion);

export const Persona:any=persona_model(conexion);
export const PersonaEntidad:any=personaEntidad_model(conexion);
export const Entidad:any = entidad_model(conexion);
export const Usuario:any=usuario_model(conexion);


// REALCIONES

Categoria.hasMany(SubCategoria,{foreignKey:"cat_id"});
SubCategoria.belongsTo(Categoria,{foreignKey:"cat_id"});

SubCategoria.hasMany(Producto,{foreignKey:"scat_id"});
Producto.belongsTo(SubCategoria,{foreignKey:"scat_id"});

Producto.hasMany(ProductoEntidadPrecio,{foreignKey:"prod_id"});
ProductoEntidadPrecio.belongsTo(Producto,{foreignKey:"prod_id"});

// UnidadMedida.hasMany(ProductoEntidadPrecio,{foreignKey:"um_id"});
// ProductoEntidadPrecio.belongsTo(UnidadMedida,{foreignKey:"um_id"});

Entidad.hasMany(ProductoEntidadPrecio,{foreignKey:"ent_id"});
ProductoEntidadPrecio.belongsTo(Entidad,{foreignKey:"ent_id"});

Entidad.hasMany(PersonaEntidad,{foreignKey:"ent_id"});
PersonaEntidad.belongsTo(Entidad,{foreignKey:"ent_id"});

Persona.hasMany(PersonaEntidad,{foreignKey:"per_id"});
PersonaEntidad.belongsTo(Persona,{foreignKey:"per_id"});

CotizacionEntidad.hasMany(CotizacionEntidadDetalle,{foreignKey:"cotient_id"});
CotizacionEntidadDetalle.belongsTo(CotizacionEntidad,{foreignKey:"cotient_id"})


CotizacionEntidadDetalle.belongsTo(Producto,{foreignKey:"prod_id"})
Producto.hasMany(CotizacionEntidadDetalle,{foreignKey:"prod_id"})


Cotizacion.hasMany(CotizacionDetalle,{foreignKey:"coti_id"});
CotizacionDetalle.belongsTo(Cotizacion,{foreignKey:"coti_id"});

Cotizacion.hasMany(CotizacionEntidad,{foreignKey:"coti_id"});
CotizacionEntidad.belongsTo(Cotizacion,{foreignKey:"coti_id"});

Producto.hasMany(CotizacionDetalle,{foreignKey:"prod_id"});
CotizacionDetalle.belongsTo(Producto,{foreignKey:"prod_id"});

Entidad.hasMany(CotizacionEntidad,{foreignKey:"ent_id"});
CotizacionEntidad.belongsTo(Entidad,{foreignKey:"ent_id"});

Distrito.hasMany(Entidad,{foreignKey:"dis_id"});
Entidad.belongsTo(Distrito,{foreignKey:"dis_id"});

Distrito.hasMany(Persona,{foreignKey:"dis_id"});
Persona.belongsTo(Distrito,{foreignKey:"dis_id"});

Usuario.hasMany(Persona,{foreignKey:"usu_id"});
Persona.belongsTo(Usuario,{foreignKey:"usu_id"});
//SE AGREGO
Usuario.hasMany(Entidad,{foreignKey:"usu_id"});
Entidad.belongsTo(Usuario,{foreignKey:"usu_id"});
//
Usuario.hasMany(Cotizacion,{foreignKey:"usu_id"});
Cotizacion.belongsTo(Usuario,{foreignKey:"usu_id"});

Provincia.hasMany(Distrito,{foreignKey:"prov_id"});
Distrito.belongsTo(Provincia,{foreignKey:"prov_id"});

Departamento.hasMany(Provincia,{foreignKey:"dpto_id"});
Provincia.belongsTo(Departamento,{foreignKey:"dpto_id"});




