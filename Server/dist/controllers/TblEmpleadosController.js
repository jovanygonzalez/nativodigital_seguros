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
const tblEmpleados_1 = __importDefault(require("../models/tblEmpleados"));
const tblRoles_1 = __importDefault(require("../models/tblRoles"));
const tblPuestos_1 = __importDefault(require("../models/tblPuestos"));
const tblPadronPersonas_1 = __importDefault(require("../models/tblPadronPersonas"));
const tblRelEmpleadosPuestos_1 = __importDefault(require("../models/tblRelEmpleadosPuestos"));
const tblRelEmpleadosRoles_1 = __importDefault(require("../models/tblRelEmpleadosRoles"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = require("../database");
const VerificacionTokenController_1 = require("./VerificacionTokenController");
class TblEmpleadosController {
    /// <summary>METODO QUE OBTIENE TODOS LOS REGISTROS DE LA TABLA tblEmpleados.
    /// <param>req</param> variable que contiene los parametros enviados al metodo
    /// <param>req</param> variable que contiene los tipos de respuestas que puede de devolver el metodo
    /// <return>Devuelve un arreglo con varios objetos del tipo tblEmpleados.</return>
    /// </summary>
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
            tblEmpleados_1.default.belongsTo(tblRoles_1.default, { through: tblRelEmpleadosRoles_1.default, foreignKey: 'iIdRol' });
            tblEmpleados_1.default.belongsTo(tblPuestos_1.default, { through: tblRelEmpleadosPuestos_1.default, foreignKey: 'iIdPuesto' });
            // if (!lRespuesta) {
            //     res.sendStatus(403);
            // } else {
            let lstRespuesta = [];
            if (req.query.lTodos == 'true') {
                lstRespuesta = yield tblEmpleados_1.default.findAll({
                    include: [
                        {
                            model: tblRoles_1.default,
                            required: false
                        },
                        {
                            model: tblPuestos_1.default,
                            required: false
                        }
                    ]
                });
            }
            else if (req.query.lTodos == 'false') {
                lstRespuesta = yield tblEmpleados_1.default.findAll({
                    where: { lActivo: 1 },
                    include: [
                        {
                            model: tblRoles_1.default,
                            required: false
                        },
                        {
                            model: tblPuestos_1.default,
                            required: false
                        }
                    ]
                });
            }
            res.json({ data: lstRespuesta });
            // }
        });
    }
    /// <summary>METODO QUE CREAR UN REGISTRO EN LA TABLA tblEmpleados.
    /// <param>req</param> variable que contiene los parametros enviados al metodo
    /// <param>req</param> variable que contiene los tipos de respuestas que puede de devolver el metodo
    /// <return>Devuelve un JSON con un mensaje y el registro insertado.</return>
    /// </summary>
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            let lastIdEmpleado;
            let resultado;
            try {
                // const lRespuesta = await VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                // if (!lRespuesta) {
                //     res.sendStatus(403);
                // } else {
                transaction = yield database_1.sequelize.transaction();
                // req.body.cCorreoElectronico = req.body.cCorreoElectronico.toString();
                req.body.dtCreacion = Date.now();
                req.body.dtModificacion = Date.now();
                req.body.cContrasena = bcrypt_1.default.hashSync(req.body.cContrasena, 10); //contraseña encriptada
                yield tblEmpleados_1.default.create(req.body, { transaction }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    //Obtiene el siguiente id que se insertara en la base y se asigna a un variable
                    resultado = result.dataValues;
                    lastIdEmpleado = result.dataValues.iIdEmpleado;
                }));
                // Actualiza lAsignado de la tabla de padron para saber si un padron ya esta asignado como empleado
                yield tblPadronPersonas_1.default.update({ lAsignado: 1 }, { where: { iIdPadron: req.body.iIdPadron }, transaction });
                // Create en tabla TblRelEmpleadoPuesto
                req.body.iIdEmpleado = lastIdEmpleado;
                yield tblRelEmpleadosPuestos_1.default.create(req.body, { transaction });
                // Create en tabla TblRelEmpleadoRoles
                // req.body.iIdEmpleado = lastIdEmpleado;
                yield tblRelEmpleadosRoles_1.default.create(req.body, { transaction });
                // Si todo esta bien, hace el commit.
                yield transaction.commit();
                res.json({
                    message: "Registro Insertado con Exito",
                    data: resultado
                });
                //}
            }
            catch (error) {
                //si hay un error, hace un rollback.
                if (transaction)
                    yield transaction.rollback();
                res.status(500).json({
                    message: 'ocurrio un error ' + error
                });
            }
        });
    }
    /// <summary>METODO QUE MODIFICA UN REGISTRO EN LA TABLA tblEmpleados.
    /// <param>req</param> variable que contiene los parametros enviados al metodo
    /// <param>req</param> variable que contiene los tipos de respuestas que puede de devolver el metodo
    /// <return>Devuelve un JSON con un mensaje y el registro Modificado.</return>
    /// </summary>
    editar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            try {
                // const lRespuesta = await VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                // if (!lRespuesta) {
                //     res.sendStatus(403);
                // } else {
                transaction = yield database_1.sequelize.transaction();
                //ecnripta la contraseña
                req.body.cContrasena = bcrypt_1.default.hashSync(req.body.cContrasena, 10); //contraseña encriptada
                //Borra la fecha de creacion de la respuesta
                delete (req.body.dtCreacion);
                //Asigna la fecha de hoy
                req.body.dtModificacion = Date.now();
                //Actualiza el objeto en la base
                yield tblEmpleados_1.default.update(req.body, { where: { iIdEmpleado: req.body.iIdEmpleado }, transaction });
                yield tblRelEmpleadosPuestos_1.default.update(req.body, { where: { iIdEmpleado: req.body.iIdEmpleado }, transaction });
                // Actualización en la tabla TblRelEmpleadoRoles
                yield tblRelEmpleadosRoles_1.default.update(req.body, { where: { iIdEmpleado: req.body.iIdEmpleado }, transaction });
                //Si todo esta bien, hace el commit.
                yield transaction.commit();
                res.json({
                    message: "Registro Modificado con Exito",
                    data: req.body
                });
                //}
            }
            catch (error) {
                //si hay un error, hace un rollback.
                if (transaction)
                    yield transaction.rollback();
                res.status(500).json({
                    message: 'ocurrio un error ' + error
                });
            }
        });
    }
    /// <summary>METODO QUE ELIMINA UN REGISTRO EN LA TABLA tblEmpleados.
    /// <param>req</param> variable que contiene los parametros enviados al metodo
    /// <param>req</param> variable que contiene los tipos de respuestas que puede de devolver el metodo
    /// <return>Devuelve un JSON con un mensaje y el registro insertado.</return>
    /// </summary>
    inactivar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                // if (!lRespuesta) {
                //     res.sendStatus(403);
                // } else {
                transaction = yield database_1.sequelize.transaction();
                req.body.dtModificacion = Date.now();
                //*Validacion - itera el objeto y  algun elemento esta inactivado, lo activa y viceversa.
                req.body = req.body.map((item) => { item.lActivo = !item.lActivo; return item; });
                yield tblEmpleados_1.default.bulkCreate(req.body, { updateOnDuplicate: ['iIdEmpleado', 'lActivo'] }, { transaction });
                //Obtener el o los Ids de los datos a inactivar para actualizar otras tablas
                let iIdPadron = req.body.map((x) => x.iIdPadron);
                //Actualiza las tablas realcionadas
                req.body.map((x) => {
                    x.lActivo == true ? 1 : 0;
                    //Actualiza la tabla de padron 
                    tblPadronPersonas_1.default.update({ lAsignado: x.lActivo }, { where: { iIdPadron: iIdPadron } });
                }, { transaction });
                //await TblRelEmpleadoPuesto.destroy({ where: { iIdEmpleado: req.body.empleado.iIdEmpleado }, transaction })
                //await TblRelEmpleadoRoles.destroy({ where: { iIdEmpleado: req.body.empleado.iIdEmpleado }, transaction })
                //Si todo esta bien, hace el commit.
                yield transaction.commit();
                res.json({
                    message: "Registro Inactivado/Activado con Exito",
                    data: req.body
                });
                //}
            }
            catch (error) {
                //si hay un error, hace un rollback.
                if (transaction)
                    yield transaction.rollback();
                res.status(500).json({
                    message: 'ocurrio un error ' + error
                });
            }
        });
    }
}
exports.TBLEMPLEADOS_CONTROLLER = new TblEmpleadosController();
//# sourceMappingURL=TblEmpleadosController.js.map