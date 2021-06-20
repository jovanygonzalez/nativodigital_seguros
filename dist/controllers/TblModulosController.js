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
const tblRelModulosFunciones_1 = __importDefault(require("../models/tblRelModulosFunciones"));
const tblModulosFunciones_1 = __importDefault(require("../models/tblModulosFunciones"));
const VerificacionTokenController_1 = require("./VerificacionTokenController");
const database_1 = require("../database");
const CryptoTSController_1 = require("./CryptoTSController");
class TblModulosController {
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
            if (!lRespuesta) {
                res.sendStatus(403);
            }
            else {
                tblModulos_1.default.belongsTo(tblTipoModulos_1.default, { foreignKey: 'iIdTipoModulo' });
                tblModulos_1.default.belongsToMany(tblModulosFunciones_1.default, { through: tblRelModulosFunciones_1.default, foreignKey: 'iIdModulo' });
                tblModulosFunciones_1.default.belongsToMany(tblModulos_1.default, { through: tblRelModulosFunciones_1.default, foreignKey: 'iIdModuloFuncion' });
                let lstRespuesta = [];
                if (req.query.lTodos == 'true') {
                    lstRespuesta = yield tblModulos_1.default.findAll({
                        include: [
                            {
                                model: tblModulosFunciones_1.default,
                                required: false
                            },
                            {
                                model: tblTipoModulos_1.default,
                                required: false
                            }
                        ]
                    });
                }
                if (req.query.lTodos == 'false') {
                    lstRespuesta = yield tblModulos_1.default.findAll({
                        where: { lActivo: 1 },
                        include: [
                            {
                                model: tblModulosFunciones_1.default,
                                required: false
                            },
                            {
                                model: tblTipoModulos_1.default,
                                required: false
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
            let lastIdModulo;
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                let objModulo = CryptoTSController_1.CRYPTOTS_CONTROLLER.decryptJson(req.body.parametros);
                if (!lRespuesta) {
                    res.sendStatus(403);
                }
                else {
                    transaction = yield database_1.sequelize.transaction();
                    //Asigna las fechas actuales
                    objModulo.dtCreacion = Date.now();
                    objModulo.dtModificacion = Date.now();
                    //inserta el modulo en la base de datos.
                    yield tblModulos_1.default.create(objModulo, { transaction }).then((result) => {
                        //Guarda el siguiente id a insertar en un variable.
                        respuesta = result.dataValues;
                        lastIdModulo = result.dataValues.iIdModulo;
                    });
                    //Itera la lista y asigna el siguiente id a insertar en la base de datos de relacion.
                    // objModulo.funciones = req.body.funciones.map((item: any) => { item.iIdModulo = lastIdModulo; return item; });
                    // //Inserta la relacion en la base de datos.
                    // await TblRelModulosFunciones.bulkCreate(req.body.funciones, { transaction });
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
                let objModulo = CryptoTSController_1.CRYPTOTS_CONTROLLER.decryptJson(req.body.parametros);
                if (!lRespuesta) {
                    res.sendStatus(403);
                }
                else {
                    transaction = yield database_1.sequelize.transaction();
                    delete (objModulo.dtCreacion);
                    objModulo.dtModificacion = Date.now();
                    yield tblModulos_1.default.update(objModulo, { where: { iIdModulo: objModulo.iIdModulo }, transaction });
                    //Elimina las relaciones de los servicios asignados al cliente
                    // await TblRelModulosFunciones.destroy({ where: { iIdModulo: objModulo.modulo.iIdModulo }, transaction });
                    // //Realiza un iteracion de la lista de funciones de servicios que recibe para editarlos
                    // objModulo.funciones.forEach(async (element: any) => {
                    //     //*Validacion - Si no esta declaro el iIdRelModuloFuncion, le asigna cero(la base de datos ya le agrega el siguiente id)
                    //     element.iIdRelModuloFuncion = element.iIdRelModuloFuncion == undefined ? 0 : element.iIdRelModuloFuncion;
                    //     //Si ya existe la fila , la edita si tiene algo que editar o agrega en caso de que se agreguen funcioness.
                    //     await TblRelModulosFunciones.findOrCreate({ where: { iIdRelModuloFuncion: element.iIdRelModuloFuncion, iIdModulo: element.iIdModulo, iIdModuloFuncion: element.iIdModuloFuncion } });
                    // }, transaction);
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
                let objModulo = CryptoTSController_1.CRYPTOTS_CONTROLLER.decryptJson(req.body.parametros);
                if (!lRespuesta) {
                    res.sendStatus(403);
                }
                else {
                    transaction = yield database_1.sequelize.transaction();
                    objModulo.dtModificacion = Date.now();
                    //*Validacion - itera el objeto y  algun elemento esta inactivado, lo activa y viceversa.
                    objModulo = objModulo.map((item) => { item.lActivo = !item.lActivo; return item; });
                    yield tblModulos_1.default.bulkCreate(objModulo, { updateOnDuplicate: ['iIdModulo', 'lActivo'] }, { transaction });
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
exports.TBLMODULOS_CONTROLLER = new TblModulosController();
//# sourceMappingURL=TblModulosController.js.map