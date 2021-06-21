"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//MODULOS
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//RUTAS
const loginRoutes_1 = require("./routes/loginRoutes");
const tblAgentesRoutes_1 = require("./routes/tblAgentesRoutes");
const tblAseguradosRoutes_1 = require("./routes/tblAseguradosRoutes");
const tblAseguradorasRoutes_1 = require("./routes/tblAseguradorasRoutes");
const tblPolizasRoutes_1 = require("./routes/tblPolizasRoutes");
const tblClientesRoutes_1 = require("./routes/tblClientesRoutes");
//CONFIGURACION
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/agentes', tblAgentesRoutes_1.tblAgentesRoutes.router);
        this.app.use('/api/aseguradoras', tblAseguradorasRoutes_1.tblAseguradorasRoutes.router);
        this.app.use('/api/polizas', tblPolizasRoutes_1.tblPolizasRoutes.router);
        this.app.use('/api/clientes', tblClientesRoutes_1.tblClientesRoutes.router);
        this.app.use('/api/asegurados', tblAseguradosRoutes_1.tblAseguradosRoutes.router);
        this.app.use('/api/login', loginRoutes_1.loginRoutes.router);
    }
    start() {
        const server = this.app.listen(this.app.get('port'), (data) => {
        });
    }
}
const SERVER = new Server();
SERVER.start();
//# sourceMappingURL=index.js.map