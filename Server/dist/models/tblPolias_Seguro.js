"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
CREATE;
TABLE;
POLIZAS_SEGURO(NUM_POLIZA, INT, PRIMARY, KEY, AUTO_INCREMENT, ID_AGENTE, INT, FOREIGN, KEY(ID_AGENTE), REFERENCES, AGENTES(ID), ID_CLIENTE, INT, FOREIGN, KEY(ID_CLIENTE), REFERENCES, CLIENTES(ID), ID_ASEGURADORA, INT, FOREIGN, KEY(ID_ASEGURADORA), REFERENCES, ASEGURADORAS(ID), FECHA_INICIO, DATETIME(3), FECHA_VIGENTE, DATETIME(3), TIPO, VARCHAR(50), PRECIO, DECIMAL(18, 0), ESTADO, TINYINT);
const TblPolizas_Seguro = database_1.sequelize.define('tblPolizas_Seguro', {
    iNum_Poliza: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    iId_Agente: {
        type: sequelize_1.default.INTEGER
    },
    iId_Aseguradora: {
        type: sequelize_1.default.INTEGER
    },
    dtFecha_Inicio: {
        type: sequelize_1.default.DATE
    },
    dtFecha_Vigente: {
        type: sequelize_1.default.DATE
    },
    iTipo: {
        type: sequelize_1.default.INTEGER
    },
    iPrecio: {
        type: sequelize_1.default.DOUBLE
    },
    iEstado: {
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
exports.default = TblPolizas_Seguro;
//# sourceMappingURL=tblPolias_Seguro.js.map