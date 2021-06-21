"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblServicios = database_1.sequelize.define('tblServicios', {
    iIdServicio: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cNombreServicio: {
        type: sequelize_1.default.TEXT
    },
    cTextoBtn: {
        type: sequelize_1.default.TEXT
    },
    iIdRuta: {
        type: sequelize_1.default.INTEGER
    },
    cIcono: {
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
exports.default = TblServicios;
//# sourceMappingURL=tblServicios.js.map