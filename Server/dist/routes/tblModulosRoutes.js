"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblModulosController_1 = require("../controllers/TblModulosController");
class TblModulosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblModulosController_1.TBLMODULOS_CONTROLLER.obtener);
        this.router.post('/', TblModulosController_1.TBLMODULOS_CONTROLLER.crear);
        this.router.post('/editar', TblModulosController_1.TBLMODULOS_CONTROLLER.editar);
        this.router.post('/inactivar', TblModulosController_1.TBLMODULOS_CONTROLLER.inactivar);
    }
}
exports.tblModulosRoutes = new TblModulosRoutes();
//# sourceMappingURL=tblModulosRoutes.js.map