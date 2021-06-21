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
const tblAseguradoras_1 = __importDefault(require("../models/tblAseguradoras"));
const database_1 = require("../database");
class TblAseguradorasController {
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let lstRespuesta = [];
            if (req.query.iIdAseguradora == null) {
                lstRespuesta = yield tblAseguradoras_1.default.findAll();
            }
            else {
                lstRespuesta = yield tblAseguradoras_1.default.findOne({ where: { iIdAseguradora: req.query.iIdAseguradora } });
            }
            res.json({ data: lstRespuesta });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.dtCreacion = Date.now();
                req.body.dtModificacion = Date.now();
                const respuesta = yield tblAseguradoras_1.default.create(req.body);
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
                const respuesta = yield tblAseguradoras_1.default.update(req.body, { where: { iIdAseguradora: req.body.iIdAseguradora } });
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
                yield tblAseguradoras_1.default.bulkCreate(req.body, { updateOnDuplicate: ['iIdAseguradora', 'lActivo'] }, { transaction });
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
exports.TBLASEGURADORAS_CONTROLLER = new TblAseguradorasController();
//# sourceMappingURL=TblAseguradorasController.js.map