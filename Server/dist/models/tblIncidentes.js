"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblIncidentes = database_1.sequelize.define('tblIncidentes', {
    iIdIncidente: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iIdCliente: {
        type: sequelize_1.default.INTEGER
    },
    iIdTipoIncidente: {
        type: sequelize_1.default.INTEGER
    },
    cAsunto: {
        type: sequelize_1.default.TEXT
    },
    cDescripcion: {
        type: sequelize_1.default.TEXT
    },
    iIdEstado: {
        type: sequelize_1.default.INTEGER
    },
    lActivo: {
        type: sequelize_1.default.INTEGER
    },
    dtCreacion: {
        type: sequelize_1.default.DATE
    },
    dtAprobacion: {
        type: sequelize_1.default.DATE
    },
    dtCierre: {
        type: sequelize_1.default.DATE
    }
}, {
    timestamps: false
});
exports.default = TblIncidentes;
//# sourceMappingURL=tblIncidentes.js.map