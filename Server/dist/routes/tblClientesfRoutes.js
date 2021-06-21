"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblClientesController_1 = require("../controllers/TblClientesController");
class TblClientesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblClientesController_1.TBLCLIENTES_CONTROLLER.obtener);
        this.router.post('/', TblClientesController_1.TBLCLIENTES_CONTROLLER.crear);
        this.router.post('/editar', TblClientesController_1.TBLCLIENTES_CONTROLLER.editar);
        this.router.post('/inactivar', TblClientesController_1.TBLCLIENTES_CONTROLLER.inactivar);
    }
}
exports.tblClientesRoutes = new TblClientesRoutes();
//# sourceMappingURL=tblClientesfRoutes.js.map