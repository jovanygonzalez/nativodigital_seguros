"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblPolizasController_1 = require("../controllers/TblPolizasController");
class TblPolizasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblPolizasController_1.TBLPOLIZAS_CONTROLLER.obtener);
        this.router.post('/', TblPolizasController_1.TBLPOLIZAS_CONTROLLER.crear);
        this.router.post('/editar', TblPolizasController_1.TBLPOLIZAS_CONTROLLER.editar);
        this.router.post('/inactivar', TblPolizasController_1.TBLPOLIZAS_CONTROLLER.inactivar);
    }
}
exports.tblPolizasRoutes = new TblPolizasRoutes();
//# sourceMappingURL=tblAgentesRouters copy 3.js.map