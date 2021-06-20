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
const tblTipoIncidentes_1 = __importDefault(require("../models/tblTipoIncidentes"));
const VerificacionTokenController_1 = require("./VerificacionTokenController");
const database_1 = require("../database");
const tblRelIncidentesActivos_1 = __importDefault(require("../models/tblRelIncidentesActivos"));
class TblTipoIncidentesController {
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
            if (!lRespuesta) {
                res.sendStatus(403);
            }
            else {
                const lstRespuesta = yield tblTipoIncidentes_1.default.findAll({ where: { lActivo: 1 } });
                res.json({ data: lstRespuesta });
            }
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            let lastIdTipoIncidente;
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                if (!lRespuesta) {
                    res.sendStatus(403);
                }
                else {
                    transaction = yield database_1.sequelize.transaction();
                    req.body.tipo.dtCreacion = Date.now();
                    req.body.tipo.dtModificacion = Date.now();
                    yield tblTipoIncidentes_1.default.create(req.body.tipo, { transaction }).then((result) => {
                        lastIdTipoIncidente = result.dataValues.iIdTipoIncidente;
                    });
                    req.body.activo = req.body.activo.map((item) => { item.iIdIncidente = lastIdTipoIncidente; return item; });
                    yield tblRelIncidentesActivos_1.default.bulkCreate(req.body.activo, { transaction });
                    yield transaction.commit();
                    return res.json({
                        message: "Registro Insertado con Exito",
                        data: req.body
                    });
                }
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
    editar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                if (!lRespuesta) {
                    res.sendStatus(403);
                }
                else {
                    transaction = yield database_1.sequelize.transaction();
                    delete (req.body.tipo.dtCreacion);
                    req.body.tipo.dtModificacion = Date.now();
                    yield tblTipoIncidentes_1.default.update(req.body.tipo, { where: { iIdTipoIncidente: req.body.tipo.iIdTipoIncidente }, transaction });
                    yield tblRelIncidentesActivos_1.default.destroy({ where: { iIdIncidente: req.body.tipo.iIdTipoIncidente }, transaction });
                    req.body.activo.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                        //*Validacion - Si no esta declaro el iIdRelIncidenteActivo, le asigna cero(la base de datos ya le agrega el siguiente id)
                        element.iIdRelIncidenteActivo = element.iIdRelIncidenteActivo == undefined ? 0 : element.iIdRelIncidenteActivo;
                        //Si ya existe la fila , la edita si tiene algo que editar o agrega en caso de que se agreguen permisos.
                        yield tblRelIncidentesActivos_1.default.findOrCreate({ where: { iIdRelIncidenteActivo: element.iIdRelIncidenteActivo, iIdIncidente: element.iIdIncidente, iIdActivo: element.iIdActivo } });
                    }));
                    yield transaction.commit();
                    return res.json({
                        message: "Registro Modificado con Exito",
                        data: req.body
                    });
                }
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
    inactivar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                if (!lRespuesta) {
                    res.sendStatus(403);
                }
                else {
                    transaction = yield database_1.sequelize.transaction();
                    req.body.dtModificacion = Date.now();
                    //*Validacion - itera el objeto y  algun elemento esta inactivado, lo activa y viceversa.
                    req.body = req.body.map((item) => { item.lActivo = !item.lActivo; return item; });
                    yield tblTipoIncidentes_1.default.bulkCreate(req.body, { updateOnDuplicate: ['iIdTipoIncidente', 'lActivo'] }, { transaction });
                    yield transaction.commit();
                    return res.json({
                        message: "Registro Eliminado con Exito",
                        data: req.body.tipo
                    });
                }
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
exports.TBLTIPOINCIDENTES_CONTROLLER = new TblTipoIncidentesController();
//# sourceMappingURL=TblTipoIncidentesController.js.map