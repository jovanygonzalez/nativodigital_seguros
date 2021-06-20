"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblRelSolucionesIncidentes = database_1.sequelize.define('tblRelSoluciones_Incidentes', {
    iIdRelSolucionIncidente: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iIdSolucionIncidente: {
        type: sequelize_1.default.INTEGER
    },
    iIdIncidente: {
        type: sequelize_1.default.INTEGER
    }
}, {
    timestamps: false
});
exports.default = TblRelSolucionesIncidentes;
//# sourceMappingURL=tblRelSolucionesIncidentes.js.map