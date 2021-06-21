"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblRelModulosPermisos = database_1.sequelize.define('tblRelModulos_Permisos', {
    iIdRelModuloPermiso: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iIdModulo: {
        type: sequelize_1.default.INTEGER
    },
    iIdPermiso: {
        type: sequelize_1.default.INTEGER
    }
}, {
    timestamps: false
});
exports.default = TblRelModulosPermisos;
//# sourceMappingURL=tblRelModulosPermisos.js.map