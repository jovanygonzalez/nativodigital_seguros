"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblServiciosController_1 = require("../controllers/TblServiciosController");
class TblServiciosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblServiciosController_1.TBLSERVICIOS_CONTROLLER.obtener);
        this.router.post('/', TblServiciosController_1.TBLSERVICIOS_CONTROLLER.crear);
        this.router.post('/editar', TblServiciosController_1.TBLSERVICIOS_CONTROLLER.editar);
        this.router.post('/inactivar', TblServiciosController_1.TBLSERVICIOS_CONTROLLER.inactivar);
    }
}
exports.tblServiciosRoutes = new TblServiciosRoutes();
//# sourceMappingURL=tblServiciosRoutes.js.map