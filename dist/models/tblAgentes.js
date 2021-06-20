"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblAgentes = database_1.sequelize.define('tblAgentes', {
    iIdAgente: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cNombreCompleto: {
        type: sequelize_1.default.TEXT
    },
    cEmail: {
        type: sequelize_1.default.TEXT
    },
    cContrasena: {
        type: sequelize_1.default.TEXT
    },
    lActivo: {
        type: sequelize_1.default.INTEGER
    },
    dtCreacion: {
        type: sequelize_1.default.DATE
    },
    dtModificacion: {
        type: sequelize_1.default.DATE
    }
}, {
    timestamps: false
});
exports.default = TblAgentes;
//# sourceMappingURL=tblAgentes.js.map