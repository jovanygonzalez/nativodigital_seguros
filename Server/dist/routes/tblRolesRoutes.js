"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TblRolesController_1 = require("../controllers/TblRolesController");
class TblRolesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', TblRolesController_1.TBLROLES_CONTROLLER.obtener);
        this.router.post('/', TblRolesController_1.TBLROLES_CONTROLLER.crear);
        this.router.post('/editar', TblRolesController_1.TBLROLES_CONTROLLER.editar);
        this.router.post('/inactivar', TblRolesController_1.TBLROLES_CONTROLLER.inactivar);
    }
}
exports.tblRolesRoutes = new TblRolesRoutes();
//# sourceMappingURL=tblRolesRoutes.js.map