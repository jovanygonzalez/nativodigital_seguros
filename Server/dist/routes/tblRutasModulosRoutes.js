"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblRutasModulosController_1 = require("../controllers/TblRutasModulosController");
class TblRutasModulosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblRutasModulosController_1.TBLRUTASMODULOS_CONTROLLER.obtener);
        this.router.post('/', TblRutasModulosController_1.TBLRUTASMODULOS_CONTROLLER.crear);
        this.router.post('/editar', TblRutasModulosController_1.TBLRUTASMODULOS_CONTROLLER.editar);
        this.router.post('/inactivar', TblRutasModulosController_1.TBLRUTASMODULOS_CONTROLLER.inactivar);
    }
}
exports.tblRutasModulosRoutes = new TblRutasModulosRoutes();
//# sourceMappingURL=tblRutasModulosRoutes.js.map