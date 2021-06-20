"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblPuestoClienteController_1 = require("../controllers/TblPuestoClienteController");
class TblPuestoClienteRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblPuestoClienteController_1.TBLPUESTOCLIENTECONTROLLER_CONTROLLER.obtener);
        this.router.post('/', TblPuestoClienteController_1.TBLPUESTOCLIENTECONTROLLER_CONTROLLER.crear);
        this.router.post('/editar', TblPuestoClienteController_1.TBLPUESTOCLIENTECONTROLLER_CONTROLLER.editar);
        this.router.post('/inactivar', TblPuestoClienteController_1.TBLPUESTOCLIENTECONTROLLER_CONTROLLER.inactivar);
    }
}
exports.tblPuestoClienteRoutes = new TblPuestoClienteRoutes();
//# sourceMappingURL=tblPuestoClienteRoutes.js.map