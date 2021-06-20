"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblSolucionesIncidentesController_1 = require("../controllers/TblSolucionesIncidentesController");
class TblSolucionesIncidentesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblSolucionesIncidentesController_1.TBLSOLUCIONESINCIDENTES_CONTROLLER.obtener);
        this.router.post('/', TblSolucionesIncidentesController_1.TBLSOLUCIONESINCIDENTES_CONTROLLER.crear);
        this.router.post('/editar', TblSolucionesIncidentesController_1.TBLSOLUCIONESINCIDENTES_CONTROLLER.editar);
        this.router.post('/inactivar', TblSolucionesIncidentesController_1.TBLSOLUCIONESINCIDENTES_CONTROLLER.inactivar);
    }
}
exports.tblSolucionesIncidentesRoutes = new TblSolucionesIncidentesRoutes();
//# sourceMappingURL=tblSolucionesIncidentesRoutes.js.map