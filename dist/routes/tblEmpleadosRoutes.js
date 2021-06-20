"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblEmpleadosController_1 = require("../controllers/TblEmpleadosController");
class TblEmpleadosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblEmpleadosController_1.TBLEMPLEADOS_CONTROLLER.obtener);
        this.router.post('/', TblEmpleadosController_1.TBLEMPLEADOS_CONTROLLER.crear);
        this.router.post('/editar', TblEmpleadosController_1.TBLEMPLEADOS_CONTROLLER.editar);
        this.router.post('/inactivar', TblEmpleadosController_1.TBLEMPLEADOS_CONTROLLER.inactivar);
    }
}
exports.tblEmpleadosRoutes = new TblEmpleadosRoutes();
//# sourceMappingURL=tblEmpleadosRoutes.js.map