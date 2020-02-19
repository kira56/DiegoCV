import express, { Response, Request } from "express";
import bodyParser from "body-parser";
import { entidad_router } from "../rutas/Entidad";
import { conexion } from "../configuracion/Sequelize";
import { usuario_router } from "../rutas/Usuario";
import { producto_router } from "../rutas/Productos";
import { categorias_router } from "../rutas/Categoria";
import { Subcategorias_router } from "../rutas/SubCategorias";
import { departamento_router } from "../rutas/Departamento";
import { provincia_router } from "../rutas/Provincia";
import { distrito_router } from "../rutas/Distrito";
import { persona_router } from "../rutas/Persona";
import { um_router } from "../rutas/UnidadMedida";
import { cotizacion_router } from "../rutas/Cotizacion";
import { cotizacionDetalle_router } from "../rutas/CotizacionDetalle";
import { productoEntidad_router } from "../rutas/ProductoEntidad";
import { cotizacionEntidad_router } from '../rutas/CotizacionEntidad';

export class Server {
  public puerto: any;
  public app: express.Application;

  constructor() {
    this.app = express();
    this.puerto = process.env.PORT || 3000;
    this.habilitarCORS();
    this.configurarBodyParser();
    this.configurarRutas();
  }

  habilitarCORS() {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
      );
      res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });
  }

  configurarBodyParser() {
    this.app.use(bodyParser.json());
  }
  configurarRutas() {
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).send("Bienvenido al Servidor");
    });
    this.app.use("/api", entidad_router);
    this.app.use("/api", usuario_router);
    this.app.use("/api", producto_router);
    this.app.use("/api", categorias_router);
    this.app.use("/api", Subcategorias_router);
    this.app.use("/api", departamento_router);
    this.app.use("/api", distrito_router);
    this.app.use("/api", provincia_router);
    this.app.use("/api", persona_router);
    this.app.use("/api", um_router);
    this.app.use("/api", cotizacion_router);
    this.app.use("/api", cotizacionDetalle_router);
    this.app.use("/api", productoEntidad_router);
    this.app.use("/api", cotizacionEntidad_router);

  }

  start() {
    this.app.listen(this.puerto, () => {
      console.log("Servidor Corriendo en el puerto: " + this.puerto);
      conexion.sync({ force: false, alter: false }).then(() => {
        console.log("Base de datos creada correctamente");
      });
    });
  }
}
