"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblClientes = database_1.sequelize.define('tblClientes', {
    iIdCliente: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iIdPadron: {
        type: sequelize_1.default.INTEGER
    },
    cUsuario: {
        type: sequelize_1.default.TEXT
    },
    cCorreoElectronico: {
        type: sequelize_1.default.TEXT
    },
    cContrasena: {
        type: sequelize_1.default.TEXT
    },
    lActivo: {
        type: sequelize_1.default.INTEGER
    },
    lesCliente: {
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
exports.default = TblClientes;
//# sourceMappingURL=tblClientesff.js.map