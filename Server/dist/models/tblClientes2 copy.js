"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
CREATE;
TABLE;
ASEGURADOS(NOMBRE_COMPLETO, VARCHAR(50), NOT, NULL, NUM_POLIZA, INT, NOT, NULL);
const TblAsegurados = database_1.sequelize.define('tblAsegurados', {
    iIdAsegurado: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cNombre_Completo: {
        type: sequelize_1.default.TEXT
    },
    iNum_Poliza: {
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
    }
}, {
    timestamps: false
});
exports.default = TblAsegurados;
//# sourceMappingURL=tblClientes2 copy.js.map