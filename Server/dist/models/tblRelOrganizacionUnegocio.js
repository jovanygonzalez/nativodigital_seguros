"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblRelOrganizacionUnegocios = database_1.sequelize.define('tblRelOrganizaciones_Unegocios', {
    iIdRelOrganizacionUnegocio: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iIdOrganizacion: {
        type: sequelize_1.default.INTEGER
    },
    iIdUnegocio: {
        type: sequelize_1.default.INTEGER
    }
}, {
    timestamps: false
});
exports.default = TblRelOrganizacionUnegocios;
//# sourceMappingURL=tblRelOrganizacionUnegocio.js.map