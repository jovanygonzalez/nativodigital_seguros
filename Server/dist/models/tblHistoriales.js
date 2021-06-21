"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblHistoriales = database_1.sequelize.define('tblHistoriales', {
    iIdHistorial: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iIdEmpleado: {
        type: sequelize_1.default.INTEGER
    },
    iIdIncidente: {
        type: sequelize_1.default.INTEGER
    },
    iIdSolucionIncidente: {
        type: sequelize_1.default.INTEGER
    },
    iIdAsistencia: {
        type: sequelize_1.default.INTEGER
    },
    iIdSolucionAsistencia: {
        type: sequelize_1.default.INTEGER
    },
    iIdEstado: {
        type: sequelize_1.default.INTEGER
    },
    iVistas: {
        type: sequelize_1.default.INTEGER
    },
    lActivo: {
        type: sequelize_1.default.INTEGER
    },
    lEsIncidente: {
        type: sequelize_1.default.INTEGER
    },
    dtCreacion: {
        type: sequelize_1.default.DATE
        // defaultValue: Sequelize.NOW
    },
    dtModificacion: {
        type: sequelize_1.default.DATE
        // defaultValue: Sequelize.NOW
    },
}, {
    timestamps: false
});
exports.default = TblHistoriales;
//# sourceMappingURL=tblHistoriales.js.map