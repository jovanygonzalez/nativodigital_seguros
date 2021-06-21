"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
// CREATE TABLE CLIENTES (
// 	ID INT PRIMARY KEY AUTO_INCREMENT,
// 	NOMBRE_COMPLETO VARCHAR (50) NOT NULL,
// 	TELEFONO VARCHAR (50) ,
// 	EMAIL VARCHAR (50) ,
// 	ID_AGENTE  INT NOT NULL,
// 	FOREIGN KEY (ID_AGENTE) REFERENCES AGENTES (ID),
// 	EDAD  INT
// );
const TblClientes = database_1.sequelize.define('tblClientes', {
    iIdCliente: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cNombreCompleto: {
        type: sequelize_1.default.TEXT
    },
    cTelefono: {
        type: sequelize_1.default.TEXT
    },
    cEmail: {
        type: sequelize_1.default.TEXT
    },
    iEdad: {
        type: sequelize_1.default.INTEGER
    },
    iIdAgente: {
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
exports.default = TblClientes;
//# sourceMappingURL=tblClientes.js.map