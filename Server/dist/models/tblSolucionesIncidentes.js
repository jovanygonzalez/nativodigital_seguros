"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblSolucionesIncidentes = database_1.sequelize.define('tblSolucionesIncidentes', {
    iIdSolucionIncidente: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iIdEmpleado: {
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
    lAprobado: {
        type: sequelize_1.default.INTEGER
    },
    lActivo: {
        type: sequelize_1.default.INTEGER
    },
    dtCreacion: {
        type: sequelize_1.default.DATE
    },
    dtVencimiento: {
        type: sequelize_1.default.DATE
    },
    dtModificacion: {
        type: sequelize_1.default.DATE
    },
    dtCierre: {
        type: sequelize_1.default.DATE
    },
}, {
    timestamps: false
});
exports.default = TblSolucionesIncidentes;
//# sourceMappingURL=tblSolucionesIncidentes.js.map