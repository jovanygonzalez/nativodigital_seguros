"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblAseguradorasController_1 = require("../controllers/TblAseguradorasController");
class TblAseguradorasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblAseguradorasController_1.TBLASEGURADORAS_CONTROLLER.obtener);
        this.router.post('/', TblAseguradorasController_1.TBLASEGURADORAS_CONTROLLER.crear);
        this.router.post('/editar', TblAseguradorasController_1.TBLASEGURADORAS_CONTROLLER.editar);
        this.router.post('/inactivar', TblAseguradorasController_1.TBLASEGURADORAS_CONTROLLER.inactivar);
    }
}
exports.tblAseguradorasRoutes = new TblAseguradorasRoutes();
//# sourceMappingURL=tblAseguradorasRoutes.js.map