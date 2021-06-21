"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblAsegurados = database_1.sequelize.define('tblAsegurados', {
    iIdAsegurado: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cNombreCompleto: {
        type: sequelize_1.default.TEXT
    },
    iIdPoliza: {
        type: sequelize_1.default.INTEGER
    },
    iEdad: {
        type: sequelize_1.default.INTEGER
    },
    lActivo: {
        type: sequelize_1.default.INTEGER
    },
    dtCreacion: {
        type: sequelize_1.default.DATE
    },
    dtModificacion: {
        type: sequelize_1.default.DATE
    }
}, {
    timestamps: false
});
exports.default = TblAsegurados;
//# sourceMappingURL=tblAsegurados.js.map