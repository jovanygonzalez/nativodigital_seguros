"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblRelEmpleadoRoles = database_1.sequelize.define('tblRelEmpleado_Roles', {
    iIdRelEmpleadoRol: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iIdEmpleado: {
        type: sequelize_1.default.INTEGER
    },
    iIdRol: {
        type: sequelize_1.default.INTEGER
    }
}, {
    timestamps: false
});
exports.default = TblRelEmpleadoRoles;
//# sourceMappingURL=tblRelEmpleadosRoles.js.map