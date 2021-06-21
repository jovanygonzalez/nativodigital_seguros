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
const tblModulos_1 = __importDefault(require("../models/tblModulos"));
const tblTipoModulos_1 = __importDefault(require("../models/tblTipoModulos"));
const tblRutasModulos_1 = __importDefault(require("../models/tblRutasModulos"));
const VerificacionTokenController_1 = require("./VerificacionTokenController");
const database_1 = require("../database");
const CryptoTSController_1 = require("./CryptoTSController");
class TblTipoModulosController {
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
            if (!lRespuesta) {
                res.sendStatus(403);
            }
            else {
                tblTipoModulos_1.default.hasMany(tblModulos_1.default, { foreignKey: 'iIdTipoModulo' });
                tblModulos_1.default.belongsTo(tblRutasModulos_1.default, { foreignKey: 'iIdRuta' });
                let lstRespuesta = [];
                if (req.query.lTodos == 'true') {
                    lstRespuesta = yield tblTipoModulos_1.default.findAll({
                        order: [
                            ['iOrden', 'ASC'],
                        ],
                        include: [
                            {
                                model: tblModulos_1.default,
                                required: false,
                                where: { lActivo: 1 },
                                include: [
                                    {
                                        model: tblRutasModulos_1.default,
                                        where: { lActivo: 1 },
                                        required: false
                                    },
                                ]
                            },
                        ]
                    });
                }
                if (req.query.lTodos == 'false') {
                    lstRespuesta = yield tblTipoModulos_1.default.findAll({
                        where: { lActivo: 1 },
                        order: [
                            ['iOrden', 'ASC'],
                        ],
                        include: [
                            {
                                model: tblModulos_1.default,
                                required: false,
                                where: { lActivo: 1 },
                                include: [
                                    {
                                        model: tblRutasModulos_1.default,
                                        where: { lActivo: 1 },
                                        required: false
                                    },
                                ]
                            }
                        ]
                    });
                }
                let consulta = CryptoTSController_1.CRYPTOTS_CONTROLLER.encryptJson(lstRespuesta);
                res.json({ data: consulta });
            }
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            let respuesta;
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                let objTipoModulo = CryptoTSController_1.CRYPTOTS_CONTROLLER.decryptJson(req.body.parametros);
                if (!lRespuesta) {
                    res.sendStatus(403);
                }
                else {
                    transaction = yield database_1.sequelize.transaction();
                    //Asigna las fechas actuales
                    objTipoModulo.dtCreacion = Date.now();
                    objTipoModulo.dtModificacion = Date.now();
                    //inserta el tipo de modulo en la base de datos.
                    yield tblTipoModulos_1.default.create(objTipoModulo, { transaction }).then((result) => {
                        //Guarda el req.body completo.
                        respuesta = result.dataValues;
                    });
                    yield transaction.commit();
                    return res.json({
                        message: "Registro Insertado con Exito",
                        data: req.body.parametros
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
                let objTipoModulo = CryptoTSController_1.CRYPTOTS_CONTROLLER.decryptJson(req.body.parametros);
                if (!lRespuesta) {
                    res.sendStatus(403);
                }
                else {
                    transaction = yield database_1.sequelize.transaction();
                    delete (objTipoModulo.dtCreacion);
                    objTipoModulo.dtModificacion = Date.now();
                    yield tblTipoModulos_1.default.update(objTipoModulo, { where: { iIdTipoModulo: objTipoModulo.iIdTipoModulo }, transaction });
                    yield transaction.commit();
                    return res.json({
                        message: "Registro Modificado con Exito",
                        data: req.body.parametros
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
                let objTipoModulo = CryptoTSController_1.CRYPTOTS_CONTROLLER.decryptJson(req.body.parametros);
                if (!lRespuesta) {
                    res.sendStatus(403);
                }
                else {
                    transaction = yield database_1.sequelize.transaction();
                    objTipoModulo.dtModificacion = Date.now();
                    //*Validacion - itera el objeto y  algun elemento esta inactivado, lo activa y viceversa.
                    objTipoModulo = objTipoModulo.map((item) => { item.lActivo = !item.lActivo; return item; });
                    yield tblTipoModulos_1.default.bulkCreate(objTipoModulo, { updateOnDuplicate: ['iITipodModulo', 'lActivo'] }, { transaction });
                    yield transaction.commit();
                    return res.json({
                        message: "Registro Inactivado con Exito",
                        data: req.body.parametros
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
exports.TBLTIPOMODULOS_CONTROLLER = new TblTipoModulosController();
//# sourceMappingURL=TblTipoModulosController.js.map