"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblActivosController_1 = require("../controllers/TblActivosController");
class TblActivosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblActivosController_1.TBLACTIVOS_CONTROLLER.obtener);
        this.router.post('/', TblActivosController_1.TBLACTIVOS_CONTROLLER.crear);
        this.router.post('/editar', TblActivosController_1.TBLACTIVOS_CONTROLLER.editar);
        this.router.post('/inactivar', TblActivosController_1.TBLACTIVOS_CONTROLLER.inactivar);
    }
}
exports.tblActivosRoutes = new TblActivosRoutes();
//# sourceMappingURL=tblActivosRoutes.js.map