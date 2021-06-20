"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblAseguradosController_1 = require("../controllers/TblAseguradosController");
class TblAseguradosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblAseguradosController_1.TBLASEGURADOS_CONTROLLER.obtener);
        this.router.post('/', TblAseguradosController_1.TBLASEGURADOS_CONTROLLER.crear);
        this.router.post('/editar', TblAseguradosController_1.TBLASEGURADOS_CONTROLLER.editar);
        this.router.post('/inactivar', TblAseguradosController_1.TBLASEGURADOS_CONTROLLER.inactivar);
    }
}
exports.tblAseguradosRoutes = new TblAseguradosRoutes();
//# sourceMappingURL=tblAseguradosRoutes.js.map