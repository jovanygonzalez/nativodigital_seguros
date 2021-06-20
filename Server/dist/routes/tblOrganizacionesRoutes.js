"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblOrganizacionesController_1 = require("../controllers/TblOrganizacionesController");
class TblOrganizacionesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblOrganizacionesController_1.TBLORGANIZACIONES_CONTROLLER.obtener);
        this.router.post('/', TblOrganizacionesController_1.TBLORGANIZACIONES_CONTROLLER.crear);
        this.router.post('/editar', TblOrganizacionesController_1.TBLORGANIZACIONES_CONTROLLER.editar);
        this.router.post('/inactivar', TblOrganizacionesController_1.TBLORGANIZACIONES_CONTROLLER.inactivar);
    }
}
exports.tblOrganizacionesRoutes = new TblOrganizacionesRoutes();
//# sourceMappingURL=tblOrganizacionesRoutes.js.map