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
const tblAgentes_1 = __importDefault(require("../models/tblAgentes"));
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
class TblAgentesController {
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let lstRespuesta = [];
            if (req.query.iIdAgente == null) {
                lstRespuesta = yield tblAgentes_1.default.findAll();
            }
            else {
                lstRespuesta = yield tblAgentes_1.default.findOne({ where: { iIdAgente: req.query.iIdAgente } });
            }
            res.json({ data: lstRespuesta });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.dtCreacion = Date.now();
                req.body.dtModificacion = Date.now();
                req.body.cContrasena = bcrypt_1.default.hashSync(req.body.cContrasena, 10); //contraseña encriptada
                const respuesta = yield tblAgentes_1.default.create(req.body);
                if (respuesta) {
                    return res.json({
                        message: "Registro Insertado con Exito",
                        data: respuesta
                    });
                }
                // }
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
                const respuesta = yield tblAgentes_1.default.update(req.body, { where: { iIdAgente: req.body.iIdAgente } });
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
                yield tblAgentes_1.default.bulkCreate(req.body, { updateOnDuplicate: ['iIdAgente', 'lActivo'] }, { transaction });
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
exports.TBLAGENTES_CONTROLLER = new TblAgentesController();
//# sourceMappingURL=TblAgentesController.js.map