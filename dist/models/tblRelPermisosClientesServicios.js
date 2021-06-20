"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblRelPermisosClientesServicios = database_1.sequelize.define('tblRelPermisos_Clientes_Servicios', {
    iIdRelPermisoServicio: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iIdPermisoCliente: {
        type: sequelize_1.default.INTEGER
    },
    iIdServicio: {
        type: sequelize_1.default.INTEGER
    },
    iIdCliente: {
        type: sequelize_1.default.INTEGER
    }
}, {
    timestamps: false
});
exports.default = TblRelPermisosClientesServicios;
//# sourceMappingURL=tblRelPermisosClientesServicios.js.map