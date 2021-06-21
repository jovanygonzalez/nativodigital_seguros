"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblIncidentesController_1 = require("../controllers/TblIncidentesController");
class TblIncidentesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblIncidentesController_1.TBLINCIDENTES_CONTROLLER.obtener);
        this.router.post('/', TblIncidentesController_1.TBLINCIDENTES_CONTROLLER.crear);
        this.router.post('/editar', TblIncidentesController_1.TBLINCIDENTES_CONTROLLER.editar);
        this.router.post('/inactivar', TblIncidentesController_1.TBLINCIDENTES_CONTROLLER.inactivar);
    }
}
exports.tblIncidentesRoutes = new TblIncidentesRoutes();
//# sourceMappingURL=tblIncidentesRoutes.js.map