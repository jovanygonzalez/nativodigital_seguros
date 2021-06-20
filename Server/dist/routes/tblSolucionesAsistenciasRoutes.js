"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblSolucionesAsistenciasController_1 = require("../controllers/TblSolucionesAsistenciasController");
class TblSolucionesAsistenciasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblSolucionesAsistenciasController_1.TBLSOLUCIONESASISTENCIAS_CONTROLLER.obtener);
        this.router.post('/', TblSolucionesAsistenciasController_1.TBLSOLUCIONESASISTENCIAS_CONTROLLER.crear);
        this.router.post('/editar', TblSolucionesAsistenciasController_1.TBLSOLUCIONESASISTENCIAS_CONTROLLER.editar);
        this.router.post('/inactivar', TblSolucionesAsistenciasController_1.TBLSOLUCIONESASISTENCIAS_CONTROLLER.inactivar);
    }
}
exports.tblSolucionesAsistenciasRoutes = new TblSolucionesAsistenciasRoutes();
//# sourceMappingURL=tblSolucionesAsistenciasRoutes.js.map