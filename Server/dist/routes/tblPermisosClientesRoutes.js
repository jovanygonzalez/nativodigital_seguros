"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblPermisosClientesController_1 = require("../controllers/TblPermisosClientesController");
class TblPermisosClientesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblPermisosClientesController_1.TBLPERMISOSCLIENTESCONTROLLER_CONTROLLER.obtener);
        this.router.post('/', TblPermisosClientesController_1.TBLPERMISOSCLIENTESCONTROLLER_CONTROLLER.crear);
        this.router.post('/editar', TblPermisosClientesController_1.TBLPERMISOSCLIENTESCONTROLLER_CONTROLLER.editar);
        this.router.post('/inactivar', TblPermisosClientesController_1.TBLPERMISOSCLIENTESCONTROLLER_CONTROLLER.inactivar);
    }
}
exports.tblPermisosClientesRoutes = new TblPermisosClientesRoutes();
//# sourceMappingURL=tblPermisosClientesRoutes.js.map