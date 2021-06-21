"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblTipoIncidentesController_1 = require("../controllers/TblTipoIncidentesController");
class TblTipoIncidentesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblTipoIncidentesController_1.TBLTIPOINCIDENTES_CONTROLLER.obtener);
        this.router.post('/', TblTipoIncidentesController_1.TBLTIPOINCIDENTES_CONTROLLER.crear);
        this.router.post('/editar', TblTipoIncidentesController_1.TBLTIPOINCIDENTES_CONTROLLER.editar);
        this.router.post('/inactivar', TblTipoIncidentesController_1.TBLTIPOINCIDENTES_CONTROLLER.inactivar);
    }
}
exports.tblTipoIncidentesRoutes = new TblTipoIncidentesRoutes();
//# sourceMappingURL=tblTipoIncidenteRoutes.js.map