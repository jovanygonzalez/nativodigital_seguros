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
const tblPadronPersonas_1 = __importDefault(require("../models/tblPadronPersonas"));
const VerificacionTokenController_1 = require("./VerificacionTokenController");
const database_1 = require("../database");
const CryptoTSController_1 = require("./CryptoTSController");
class TblPadronPersonasController {
    /// <summary>METODO QUE OBTIENE TODOS LOS REGISTROS DE LA TABLA tblPadronPersonas.
    /// <param>req</param> variable que contiene los parametros enviados al metodo
    /// <param>req</param> variable que contiene los tipos de respuestas que puede de devolver el metodo
    /// <return>Devuelve un arreglo con varios objetos del tipo tblPadronPersonas.</return>
    /// </summary>
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
            if (!lRespuesta) {
                res.sendStatus(403);
            }
            else {
                let lstRespuesta = [];
                if (req.query.lTodos == 'true') {
                    lstRespuesta = yield tblPadronPersonas_1.default.findAll();
                }
                if (req.query.lTodos == 'false') {
                    lstRespuesta = yield tblPadronPersonas_1.default.findAll({ where: { lActivo: 1 } });
                }
                let consulta = CryptoTSController_1.CRYPTOTS_CONTROLLER.encryptJson(lstRespuesta);
                res.json({ data: consulta });
            }
        });
    }
    /// <summary>METODO QUE CREAR UN REGISTRO EN LA TABLA tblPadronPersonas.
    /// <param>req</param> variable que contiene los parametros enviados al metodo
    /// <param>req</param> variable que contiene los tipos de respuestas que puede de devolver el metodo
    /// <return>Devuelve un JSON con un mensaje y el registro insertado.</return>
    /// </summary>
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                let objPadron = CryptoTSController_1.CRYPTOTS_CONTROLLER.decryptJson(req.body.parametros);
                if (!lRespuesta) {
                    res.sendStatus(403);
                }
                else {
                    const respuesta = yield tblPadronPersonas_1.default.create(objPadron);
                    if (respuesta) {
                        return res.json({
                            message: "Registro Insertado con Exito",
                            data: req.body.parametros
                        });
                    }
                }
            }
            catch (error) {
                res.status(500).json({
                    message: 'ocurrio un error' + error
                });
            }
        });
    }
    /// <summary>METODO QUE MODIFICA UN REGISTRO EN LA TABLA tblPadronPersonas.
    /// <param>req</param> variable que contiene los parametros enviados al metodo
    /// <param>req</param> variable que contiene los tipos de respuestas que puede de devolver el metodo
    /// <return>Devuelve un JSON con un mensaje y el registro Modificado.</return>
    /// </summary>
    editar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                let objPadron = CryptoTSController_1.CRYPTOTS_CONTROLLER.decryptJson(req.body.parametros);
                if (!lRespuesta) {
                    res.sendStatus(403);
                }
                else {
                    const respuesta = yield tblPadronPersonas_1.default.update(objPadron, { where: { iIdPadron: objPadron.iIdPadron } });
                    if (respuesta) {
                        return res.json({
                            message: "Registro Modificado con Exito",
                            data: req.body.parametros
                        });
                    }
                }
            }
            catch (error) {
                res.status(500).json({
                    message: 'ocurrio un error' + error
                });
            }
        });
    }
    /// <summary>METODO QUE ELIMINA UN REGISTRO EN LA TABLA tblPadronPersonas.
    /// <param>req</param> variable que contiene los parametros enviados al metodo
    /// <param>req</param> variable que contiene los tipos de respuestas que puede de devolver el metodo
    /// <return>Devuelve un JSON con un mensaje y el registro insertado.</return>
    /// </summary>
    inactivar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                let objPadron = CryptoTSController_1.CRYPTOTS_CONTROLLER.decryptJson(req.body.parametros);
                if (!lRespuesta) {
                    res.sendStatus(403);
                }
                else {
                    transaction = yield database_1.sequelize.transaction();
                    objPadron.dtModificacion = Date.now();
                    //*Validacion - itera el objeto y  algun elemento esta inactivado, lo activa y viceversa.
                    objPadron = objPadron.map((item) => { item.lActivo = !item.lActivo; return item; });
                    yield tblPadronPersonas_1.default.bulkCreate(objPadron, { updateOnDuplicate: ['iIdPadron', 'lActivo'] }, { transaction });
                    yield transaction.commit();
                    return res.json({
                        message: "Registro Inactivado/Activado con Exito",
                        data: req.body.parametros
                    });
                }
            }
            catch (error) {
                if (transaction)
                    yield transaction.rollback();
                res.status(500).json({
                    message: 'ocurrio un error' + error
                });
            }
        });
    }
}
exports.TBLPADRONPERSONAS_CONTROLLER = new TblPadronPersonasController();
//# sourceMappingURL=TblPadronPersonasController.js.map