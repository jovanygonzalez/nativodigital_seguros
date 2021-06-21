"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblModulosFuncionesController_1 = require("../controllers/TblModulosFuncionesController");
class TblModulosFuncionesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblModulosFuncionesController_1.TBLMODULOSFUNCIONES_CONTROLLER.obtener);
        this.router.post('/', TblModulosFuncionesController_1.TBLMODULOSFUNCIONES_CONTROLLER.crear);
        this.router.post('/editar', TblModulosFuncionesController_1.TBLMODULOSFUNCIONES_CONTROLLER.editar);
        this.router.post('/inactivar', TblModulosFuncionesController_1.TBLMODULOSFUNCIONES_CONTROLLER.inactivar);
    }
}
exports.tblModulosFuncionesRoutes = new TblModulosFuncionesRoutes();
//# sourceMappingURL=tblModulosFuncionesRoutes.js.map