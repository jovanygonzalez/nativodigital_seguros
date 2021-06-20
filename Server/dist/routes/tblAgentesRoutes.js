"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblAgentesController_1 = require("../controllers/TblAgentesController");
class TblAgentesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblAgentesController_1.TBLAGENTES_CONTROLLER.obtener);
        this.router.post('/', TblAgentesController_1.TBLAGENTES_CONTROLLER.crear);
        this.router.post('/editar', TblAgentesController_1.TBLAGENTES_CONTROLLER.editar);
        this.router.post('/inactivar', TblAgentesController_1.TBLAGENTES_CONTROLLER.inactivar);
    }
}
exports.tblAgentesRoutes = new TblAgentesRoutes();
//# sourceMappingURL=tblAgentesRoutes.js.map