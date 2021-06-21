"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblRelPermisosRoles = database_1.sequelize.define('tblRelPermisos_Roles', {
    iIdRelPermisoRol: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iIdRol: {
        type: sequelize_1.default.INTEGER
    },
    iIdPermiso: {
        type: sequelize_1.default.INTEGER
    }
}, {
    timestamps: false
});
exports.default = TblRelPermisosRoles;
//# sourceMappingURL=tblRelPermisosRoles.js.map