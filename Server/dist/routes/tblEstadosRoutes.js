"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblEstadosController_1 = require("../controllers/TblEstadosController");
class TblEstadosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblEstadosController_1.TBLESTADOS_CONTROLLER.obtener);
        this.router.post('/', TblEstadosController_1.TBLESTADOS_CONTROLLER.crear);
        this.router.post('/editar', TblEstadosController_1.TBLESTADOS_CONTROLLER.editar);
        this.router.post('/inactivar', TblEstadosController_1.TBLESTADOS_CONTROLLER.inactivar);
    }
}
exports.tblEstadosRoutes = new TblEstadosRoutes();
//# sourceMappingURL=tblEstadosRoutes.js.map