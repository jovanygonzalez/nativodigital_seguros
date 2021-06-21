"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const TblRelUnegocioPuesto = database_1.sequelize.define('tblRelUnegocio_Puestos', {
    iIdRelUnegocioPuesto: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iIdUnegocio: {
        type: sequelize_1.default.INTEGER
    },
    iIdPuesto: {
        type: sequelize_1.default.INTEGER
    }
}, {
    timestamps: false
});
exports.default = TblRelUnegocioPuesto;
//# sourceMappingURL=tblRelUnegocioPuestos.js.map