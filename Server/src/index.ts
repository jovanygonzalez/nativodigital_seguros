//MODULOS
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

//RUTAS
import { loginRoutes } from "./routes/loginRoutes"
import { tblAgentesRoutes } from './routes/tblAgentesRoutes';
import { tblAseguradosRoutes } from './routes/tblAseguradosRoutes';
import { tblAseguradorasRoutes } from './routes/tblAseguradorasRoutes';
import { tblPolizasRoutes } from './routes/tblPolizasRoutes';
import { tblClientesRoutes } from "./routes/tblClientesRoutes"

//CONFIGURACION
class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.use('/api/agentes', tblAgentesRoutes.router);
        this.app.use('/api/aseguradoras', tblAseguradorasRoutes.router);
        this.app.use('/api/polizas', tblPolizasRoutes.router);
        this.app.use('/api/clientes', tblClientesRoutes.router);
        this.app.use('/api/asegurados', tblAseguradosRoutes.router);
        this.app.use('/api/login', loginRoutes.router);
    }

    start(): void {
        const server = this.app.listen(this.app.get('port'), (data: any) => {
        });
    }

}
const SERVER = new Server();
SERVER.start();