"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tblClientes_1 = __importDefault(require("../models/tblClientes"));
const tblAgentes_1 = __importDefault(require("../models/tblAgentes"));
const database_1 = require("../database");
class TblClientesController {
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            tblClientes_1.default.belongsTo(tblAgentes_1.default, { foreignKey: 'iIdAgente' });
            let lstRespuesta = [];
            if (req.query.iIdCliente == null) {
                lstRespuesta = yield tblClientes_1.default.findAll({
                    include: [
                        {
                            model: tblAgentes_1.default,
                            where: { lActivo: 1 },
                            required: false
                        }
                    ]
                });
            }
            else {
                lstRespuesta = yield tblClientes_1.default.findOne({
                    include: [
                        {
                            model: tblAgentes_1.default,
                            where: { lActivo: 1 },
                            required: false
                        }
                    ],
                    where: {
                        iIdCliente: req.query.iIdCliente
                    }
                });
            }
            res.json({ data: lstRespuesta });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.dtCreacion = Date.now();
                req.body.dtModificacion = Date.now();
                const respuesta = yield tblClientes_1.default.create(req.body);
                if (respuesta) {
                    return res.json({
                        message: "Registro Insertado con Exito",
                        data: respuesta
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: 'Ocurrio un error ' + error
                });
            }
        });
    }
    editar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete (req.body.dtCreacion);
                req.body.dtModificacion = Date.now();
                const respuesta = yield tblClientes_1.default.update(req.body, { where: { iIdCliente: req.body.iIdCliente } });
                if (respuesta) {
                    return res.json({
                        message: "Registro Modificado con Exito",
                        data: req.body
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: 'Ocurrio un error ' + error
                });
            }
        });
    }
    inactivar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            try {
                transaction = yield database_1.sequelize.transaction();
                req.body.dtModificacion = Date.now();
                //*Validacion - itera el objeto y  algun elemento esta inactivado, lo activa y viceversa.
                req.body = req.body.map((item) => { item.lActivo = !item.lActivo; return item; });
                yield tblClientes_1.default.bulkCreate(req.body, { updateOnDuplicate: ['iIdCliente', 'lActivo'] }, { transaction });
                yield transaction.commit();
                return res.json({
                    message: "Registro Eliminado con Exito",
                    data: req.body
                });
            }
            catch (error) {
                if (transaction)
                    yield transaction.rollback();
                res.status(500).json({
                    message: 'Ocurrio un error ' + error
                });
            }
        });
    }
}
exports.TBLCLIENTES_CONTROLLER = new TblClientesController();
//# sourceMappingURL=TblClientesController.js.map