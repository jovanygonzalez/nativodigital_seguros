"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblTipoModulosController_1 = require("../controllers/TblTipoModulosController");
class TblTipoModulosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblTipoModulosController_1.TBLTIPOMODULOS_CONTROLLER.obtener);
        this.router.post('/', TblTipoModulosController_1.TBLTIPOMODULOS_CONTROLLER.crear);
        this.router.post('/editar', TblTipoModulosController_1.TBLTIPOMODULOS_CONTROLLER.editar);
        this.router.post('/inactivar', TblTipoModulosController_1.TBLTIPOMODULOS_CONTROLLER.inactivar);
    }
}
exports.tblTipoModulosRoutes = new TblTipoModulosRoutes();
//# sourceMappingURL=tblTipoModulosRoutes.js.map