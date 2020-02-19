import express, { Response, Request } from 'express';
import bodyParser from 'body-parser';
import { conexion } from '../configuracion/Sequelize';
import { categorias_router } from '../rutas/Categoria';
import { proveedor_router } from '../rutas/Proveedor';
import { cliente_router } from '../rutas/Cliente';
import { departamentos_router } from '../rutas/Departamentos';
import { provincia_router } from '../rutas/Provincias';
import { distrito_router } from '../rutas/Distritos';
import { subcategoria_router } from '../rutas/SubCategoria';
import { cotizacion_router } from '../rutas/Cotizacion';
import { detallecotizacion_router } from '../rutas/DetalleCotizacion';
import { usuario_router } from '../rutas/Usuario';
import { UnidadDeMedidas_router } from '../rutas/Unidadmedida';




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
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });

    }

    configurarBodyParser() {
        this.app.use(bodyParser.json())
    }
    configurarRutas() {
        this.app.get('/', (req: Request, res: Response) => {
            res.status(200).send("Bienvenido al Servidor");
        })
      
        this.app.use('/api', categorias_router);
        this.app.use('/api', proveedor_router);
        this.app.use('/api', cliente_router);
        this.app.use('/api', departamentos_router);
        this.app.use('/api', provincia_router);
        this.app.use('/api', distrito_router);
        this.app.use('/api', subcategoria_router);
        this.app.use('/api', cotizacion_router);
        this.app.use('/api', detallecotizacion_router);
        this.app.use('/api',usuario_router);
        this.app.use('/api',UnidadDeMedidas_router);

      
    }

    start() {
        this.app.listen(this.puerto, () => {
            console.log("Servidor Corriendo en el puerto: " + this.puerto);
            conexion.sync({ force: false }).then(() => {

                console.log("Base de datos creada correctamente");
            })
        })
    }
}


