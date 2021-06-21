"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblPadronPersonas = database_1.sequelize.define('tblPadronPersonas', {
    iIdPadron: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cNombre: {
        type: sequelize_1.default.TEXT
    },
    cApellidoP: {
        type: sequelize_1.default.TEXT
    },
    cApellidoM: {
        type: sequelize_1.default.TEXT
    },
    iIdSexo: {
        type: sequelize_1.default.INTEGER
    },
    cDireccion: {
        type: sequelize_1.default.TEXT
    },
    dtFechaNacimiento: {
        type: sequelize_1.default.DATE
    },
    cTelefono: {
        type: sequelize_1.default.TEXT
    },
    cCorreoElectronico: {
        type: sequelize_1.default.TEXT
    },
    lAsignado: {
        type: sequelize_1.default.INTEGER
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
exports.default = TblPadronPersonas;
//# sourceMappingURL=tblPadronPersonas.js.map