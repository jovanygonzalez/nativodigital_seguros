"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblPadronPersonasController_1 = require("../controllers/TblPadronPersonasController");
class TblPadronPersonasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblPadronPersonasController_1.TBLPADRONPERSONAS_CONTROLLER.obtener);
        this.router.post('/', TblPadronPersonasController_1.TBLPADRONPERSONAS_CONTROLLER.crear);
        this.router.post('/editar', TblPadronPersonasController_1.TBLPADRONPERSONAS_CONTROLLER.editar);
        this.router.post('/inactivar', TblPadronPersonasController_1.TBLPADRONPERSONAS_CONTROLLER.inactivar);
    }
}
exports.tblPadronPersonasRoutes = new TblPadronPersonasRoutes();
//# sourceMappingURL=tblPadronPersonasRoutes.js.map