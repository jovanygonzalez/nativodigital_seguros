"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblRelModulosFunciones = database_1.sequelize.define('tblRelModulos_Funciones', {
    iIdRelModuloFuncion: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iIdModulo: {
        type: sequelize_1.default.INTEGER
    },
    iIdModuloFuncion: {
        type: sequelize_1.default.INTEGER
    }
}, {
    timestamps: false
});
exports.default = TblRelModulosFunciones;
//# sourceMappingURL=tblRelModulosFunciones.js.map