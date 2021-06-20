"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblUnegociosController_1 = require("../controllers/TblUnegociosController");
class TblUnegociosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblUnegociosController_1.TBLUNEGOCIOS_CONTROLLER.obtener);
        this.router.post('/', TblUnegociosController_1.TBLUNEGOCIOS_CONTROLLER.crear);
        this.router.post('/editar', TblUnegociosController_1.TBLUNEGOCIOS_CONTROLLER.editar);
        this.router.post('/inactivar', TblUnegociosController_1.TBLUNEGOCIOS_CONTROLLER.inactivar);
    }
}
exports.tblUnegociosRoutes = new TblUnegociosRoutes();
//# sourceMappingURL=tblUnegociosRoutes.js.map