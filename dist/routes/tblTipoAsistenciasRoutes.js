"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblTipoAsistenciasController_1 = require("../controllers/TblTipoAsistenciasController");
class TblTipoAsistenciasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblTipoAsistenciasController_1.TBLTIPOASISTENCIAS_CONTROLLER.obtener);
        this.router.post('/', TblTipoAsistenciasController_1.TBLTIPOASISTENCIAS_CONTROLLER.crear);
        this.router.post('/editar', TblTipoAsistenciasController_1.TBLTIPOASISTENCIAS_CONTROLLER.editar);
        this.router.post('/inactivar', TblTipoAsistenciasController_1.TBLTIPOASISTENCIAS_CONTROLLER.inactivar);
    }
}
exports.tblTipoAsistenciasRoutes = new TblTipoAsistenciasRoutes();
//# sourceMappingURL=tblTipoAsistenciasRoutes.js.map