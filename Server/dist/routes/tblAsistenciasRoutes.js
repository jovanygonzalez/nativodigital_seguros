"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblAsistenciasController_1 = require("../controllers/TblAsistenciasController");
class TblAsistenciasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblAsistenciasController_1.TBLASISTENCIAS_CONTROLLER.obtener);
        this.router.post('/', TblAsistenciasController_1.TBLASISTENCIAS_CONTROLLER.crear);
        this.router.post('/editar', TblAsistenciasController_1.TBLASISTENCIAS_CONTROLLER.editar);
        this.router.post('/inactivar', TblAsistenciasController_1.TBLASISTENCIAS_CONTROLLER.inactivar);
    }
}
exports.tblAsistenciasRoutes = new TblAsistenciasRoutes();
//# sourceMappingURL=tblAsistenciasRoutes.js.map