"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblAseguradoras = database_1.sequelize.define('tblAseguradoras', {
    iIdAseguradora: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cNombre: {
        type: sequelize_1.default.TEXT
    },
    cTelefono: {
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
    },
}, {
    timestamps: false
});
exports.default = TblAseguradoras;
//# sourceMappingURL=tblAseguradoras.js.map