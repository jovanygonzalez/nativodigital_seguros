"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblHistorialesController_1 = require("../controllers/TblHistorialesController");
class TblHistorialesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblHistorialesController_1.TBLHISTORIALES_CONTROLLER.obtener);
        this.router.post('/', TblHistorialesController_1.TBLHISTORIALES_CONTROLLER.crear);
        this.router.post('/editar', TblHistorialesController_1.TBLHISTORIALES_CONTROLLER.editar);
        this.router.post('/inactivar', TblHistorialesController_1.TBLHISTORIALES_CONTROLLER.inactivar);
    }
}
exports.tblHistorialesRoutes = new TblHistorialesRoutes();
//# sourceMappingURL=tblHistorialesRoutes.js.map