"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblRelIncidentesActivos = database_1.sequelize.define('tblRelIncidentes_Activos', {
    iIdRelIncidenteActivo: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iIdIncidente: {
        type: sequelize_1.default.INTEGER
    },
    iIdActivo: {
        type: sequelize_1.default.INTEGER
    }
}, {
    timestamps: false
});
exports.default = TblRelIncidentesActivos;
//# sourceMappingURL=tblRelIncidentesActivos.js.map