"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblRelClientesOrganizaciones = database_1.sequelize.define('tblRelClientes_Organizaciones', {
    iIdRelClienteOrganizacion: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iIdCliente: {
        type: sequelize_1.default.INTEGER
    },
    iIdOrganizacion: {
        type: sequelize_1.default.INTEGER
    }
}, {
    timestamps: false
});
exports.default = TblRelClientesOrganizaciones;
//# sourceMappingURL=tblRelClientesOrganizaciones.js.map