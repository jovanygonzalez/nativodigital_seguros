"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblPuestosClientesController_1 = require("../controllers/TblPuestosClientesController");
class TblPuestosClientesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblPuestosClientesController_1.TBLPUESTOSCLIENTESCONTROLLER_CONTROLLER.obtener);
        this.router.post('/', TblPuestosClientesController_1.TBLPUESTOSCLIENTESCONTROLLER_CONTROLLER.crear);
        this.router.post('/editar', TblPuestosClientesController_1.TBLPUESTOSCLIENTESCONTROLLER_CONTROLLER.editar);
        this.router.post('/inactivar', TblPuestosClientesController_1.TBLPUESTOSCLIENTESCONTROLLER_CONTROLLER.inactivar);
    }
}
exports.tblPuestosClientesRoutes = new TblPuestosClientesRoutes();
//# sourceMappingURL=tblPuestosClientesRoutes.js.map