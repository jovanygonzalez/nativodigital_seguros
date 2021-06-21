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
const tblPolizas_1 = __importDefault(require("../models/tblPolizas"));
const database_1 = require("../database");
const tblAgentes_1 = __importDefault(require("../models/tblAgentes"));
const tblClientes_1 = __importDefault(require("../models/tblClientes"));
const tblAseguradoras_1 = __importDefault(require("../models/tblAseguradoras"));
class TblPolizasController {
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            tblPolizas_1.default.belongsTo(tblAgentes_1.default, { foreignKey: 'iIdAgente' });
            tblPolizas_1.default.belongsTo(tblClientes_1.default, { foreignKey: 'iIdCliente' });
            tblPolizas_1.default.belongsTo(tblAseguradoras_1.default, { foreignKey: 'iIdAseguradora' });
            let lstRespuesta = [];
            if (req.query.iIdPoliza == null) {
                if (req.query.dtFecha != null) {
                    //select * from tblpolizas where activo = 1 and estado = 0 and tipo = 'GASTOS MÉDICOS' AND FECHA_VIGENTE < '2025-08-04' , 
                    const { Op } = require("sequelize");
                    let dtFecha = req.query.dtFecha.toString();
                    let estado = req.query.lEstado;
                    let tipo = req.query.cTipo.toString();
                    lstRespuesta = yield tblPolizas_1.default.findAll({
                        where: {
                            [Op.and]: [
                                { lActivo: 1 },
                                { lEstado: estado },
                                { cTipo: tipo },
                                { dtFechaVigente: {
                                        [Op.lt]: dtFecha
                                    }
                                }
                            ]
                        }
                    });
                }
                else {
                    lstRespuesta = yield tblPolizas_1.default.findAll({
                        include: [
                            {
                                model: tblAgentes_1.default,
                                where: { lActivo: 1 },
                                required: false
                            },
                            {
                                model: tblClientes_1.default,
                                where: { lActivo: 1 },
                                required: false
                            },
                            {
                                model: tblAseguradoras_1.default,
                                where: { lActivo: 1 },
                                required: false
                            }
                        ]
                    });
                }
            }
            else {
                lstRespuesta = yield tblPolizas_1.default.findOne({
                    where: { iIdPoliza: req.query.iIdPoliza },
                    include: [
                        {
                            model: tblAgentes_1.default,
                            where: { lActivo: 1 },
                            required: false
                        },
                        {
                            model: tblClientes_1.default,
                            where: { lActivo: 1 },
                            required: false
                        },
                        {
                            model: tblAseguradoras_1.default,
                            where: { lActivo: 1 },
                            required: false
                        }
                    ]
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
                const respuesta = yield tblPolizas_1.default.create(req.body);
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
                const respuesta = yield tblPolizas_1.default.update(req.body, { where: { iIdPoliza: req.body.iIdPoliza } });
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
                yield tblPolizas_1.default.bulkCreate(req.body, { updateOnDuplicate: ['iIdPoliza', 'lActivo'] }, { transaction });
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
exports.TBLPOLIZAS_CONTROLLER = new TblPolizasController();
//# sourceMappingURL=TblPolizasController.js.map