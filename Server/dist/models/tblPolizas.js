"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblPolizas = database_1.sequelize.define('tblPolizas', {
    iIdPoliza: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iIdAgente: {
        type: sequelize_1.default.INTEGER
    },
    iIdCliente: {
        type: sequelize_1.default.INTEGER
    },
    iIdAseguradora: {
        type: sequelize_1.default.INTEGER
    },
    dtFechaInicio: {
        type: sequelize_1.default.DATE
    },
    dtFechaVigente: {
        type: sequelize_1.default.DATE
    },
    cTipo: {
        type: sequelize_1.default.INTEGER
    },
    dPrecio: {
        type: sequelize_1.default.DOUBLE
    },
    lEstado: {
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
    },
}, {
    timestamps: false
});
exports.default = TblPolizas;
//# sourceMappingURL=tblPolizas.js.map