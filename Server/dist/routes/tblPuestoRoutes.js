"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblPuestoController_1 = require("../controllers/TblPuestoController");
class TblPuestosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblPuestoController_1.TBLPUESTOS_CONTROLLER.obtener);
        this.router.post('/', TblPuestoController_1.TBLPUESTOS_CONTROLLER.crear);
        this.router.post('/editar', TblPuestoController_1.TBLPUESTOS_CONTROLLER.editar);
        this.router.post('/inactivar', TblPuestoController_1.TBLPUESTOS_CONTROLLER.inactivar);
    }
}
exports.tblPuestoRoutes = new TblPuestosRoutes();
//# sourceMappingURL=tblPuestoRoutes.js.map