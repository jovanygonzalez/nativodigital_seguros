"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblPermisosController_1 = require("../controllers/TblPermisosController");
class TblPermisosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblPermisosController_1.TBLPERMISOSCONTROLLER_CONTROLLER.obtener);
        this.router.post('/', TblPermisosController_1.TBLPERMISOSCONTROLLER_CONTROLLER.crear);
        this.router.post('/editar', TblPermisosController_1.TBLPERMISOSCONTROLLER_CONTROLLER.editar);
        this.router.post('/inactivar', TblPermisosController_1.TBLPERMISOSCONTROLLER_CONTROLLER.inactivar);
    }
}
exports.tblPermisosRoutes = new TblPermisosRoutes();
//# sourceMappingURL=tblPermisosRoutes.js.map