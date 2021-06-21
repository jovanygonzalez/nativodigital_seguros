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
const tblPuestos_1 = __importDefault(require("../models/tblPuestos"));
const tblPadronPersonas_1 = __importDefault(require("../models/tblPadronPersonas"));
const VerificacionTokenController_1 = require("./VerificacionTokenController");
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
class TblPuestoController {
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
            // if (!lRespuesta) {
            //     res.sendStatus(403);
            // } else {
            // const lstRespuesta = await TblPuestos.findAll({ where: { lActivo: 1 } });
            // res.json({ data: lstRespuesta });
            let lstRespuesta = [];
            if (req.query.lTodos == "true") {
                lstRespuesta = yield tblPuestos_1.default.findAll();
            }
            if (req.query.lTodos == "false") {
                lstRespuesta = yield tblPuestos_1.default.findAll({ where: { lActivo: 1 } });
            }
            res.json({ data: lstRespuesta });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                // if (!lRespuesta) {
                //     res.sendStatus(403);
                // } else {
                req.body.dtCreacion = Date.now();
                req.body.dtModificacion = Date.now();
                const respuesta = yield tblPuestos_1.default.create(req.body);
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
                    message: "Ocurrio un error " + error
                });
            }
            let transaction;
            let lastIdEmpleado;
            let resultado;
            try {
                // const lRespuesta = await VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                // if (!lRespuesta) {
                //     res.sendStatus(403);
                // } else {
                transaction = yield database_1.sequelize.transaction();
                req.body.cCorreoElectronico = req.body.cCorreoElectronico.toString();
                req.body.dtCreacion = Date.now();
                req.body.dtModificacion = Date.now();
                req.body.cContrasena = bcrypt_1.default.hashSync(req.body.cContrasena, 10); //contraseña encriptada
                yield tblPuestos_1.default.create(req.body, { transaction }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    //Obtiene el siguiente id que se insertara en la base y se asigna a un variable
                    resultado = result.dataValues;
                    lastIdEmpleado = result.dataValues.iIdEmpleado;
                }));
                //Actualiza lAsignado de la tabla de padron para saber si un padron ya esta asignado como empleado
                yield tblPadronPersonas_1.default.update({ lAsignado: 1 }, { where: { iIdPadron: req.body.iIdPadron }, transaction });
                // req.body.puesto.iIdEmpleado = lastIdEmpleado;
                // await TblRelEmpleadoPuesto.create(req.body.puesto, { transaction });
                // req.body.rol.iIdEmpleado = lastIdEmpleado;
                // await TblRelEmpleadoRoles.create(req.body.rol, { transaction });
                //Si todo esta bien, hace el commit.
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
                    message: "ocurrio un error " + error
                });
            }
        });
    }
    editar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                // if (!lRespuesta) {
                //     res.sendStatus(403);
                // } else {
                delete req.body.dtCreacion;
                req.body.dtModificacion = Date.now();
                const respuesta = yield tblPuestos_1.default.update(req.body, {
                    where: { iIdPuesto: req.body.iIdPuesto }
                });
                if (respuesta) {
                    return res.json({
                        message: "Registro Modificado con Exito",
                        data: req.body
                    });
                }
                // }
            }
            catch (error) {
                res.status(500).json({
                    message: "Ocurrio un error " + error
                });
            }
        });
    }
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
                req.body = req.body.map((item) => {
                    item.lActivo = !item.lActivo;
                    return item;
                });
                yield tblPuestos_1.default.bulkCreate(req.body, { updateOnDuplicate: ["iIdPuesto", "lActivo"] }, { transaction });
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
                    message: "ocurrio un error " + error
                });
            }
        });
    }
}
exports.TBLPUESTOS_CONTROLLER = new TblPuestoController();
//# sourceMappingURL=TblPuestoController.js.map