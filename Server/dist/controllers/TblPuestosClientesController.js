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
const tblPuestoCliente_1 = __importDefault(require("../models/tblPuestoCliente"));
const VerificacionTokenController_1 = require("./VerificacionTokenController");
const database_1 = require("../database");
class TblPuestosClientesController {
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
            // if (!lRespuesta) {
            //     res.sendStatus(403);
            // } else {
            // TblPermisos.belongsToMany(TblModulos, { through: TblRelModulosPermisos, foreignKey: 'iIdPermiso' })
            // TblModulos.belongsToMany(TblPermisos, { through: TblRelModulosPermisos, foreignKey: 'iIdModulo' })
            let lstRespuesta = [];
            if (req.query.lTodos == 'true') {
                lstRespuesta = yield tblPuestoCliente_1.default.findAll();
            }
            if (req.query.lTodos == 'false') {
                lstRespuesta = yield tblPuestoCliente_1.default.findAll({
                    where: { lActivo: 1 }
                    // ,
                    // include: [
                    //     {
                    //         model: TblModulos,
                    //         required: false
                    //     }
                    // ]
                });
            }
            res.json({ data: lstRespuesta });
            //}
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            let lastiIdPuestoCliente;
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                // if (!lRespuesta) {
                //     res.sendStatus(403);
                // } else {
                transaction = yield database_1.sequelize.transaction();
                //asigna las fecha y hora actual.
                req.body.dtCreacion = Date.now();
                req.body.dtModificacion = Date.now();
                //Inserta el permiso en la tabla de permisos.
                yield tblPuestoCliente_1.default.create(req.body, { transaction }).then((result) => {
                    lastiIdPuestoCliente = result.dataValues.iIdPermiso;
                });
                //Itera la lista de relacion modulos-permisos, asignado el id del permiso a cada elemento.
                // req.body.modulo = req.body.modulo.map((item: any) => { item.iIdPermiso = lastIdPermiso; return item });
                // //Inserta cada uno de los elementos de la lista a la tabla de relacion de modulos y permisos.
                // await TblRelModulosPermisos.bulkCreate(req.body.modulo, { transaction });
                yield transaction.commit();
                return res.json({
                    message: "Registro Insertado con Exito",
                    data: req.body
                });
                // }
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
                // if (!lRespuesta) {
                //     res.sendStatus(403);
                // } else {
                transaction = yield database_1.sequelize.transaction();
                delete (req.body.dtCreacion);
                yield tblPuestoCliente_1.default.update(req.body, { where: { iIdPuestoCliente: req.body.iIdPuestoCliente }, transaction });
                // await TblRelModulosPermisos.destroy({ where: { iIdPuestoCliente: req.body.permiso.iIdPuestoCliente }, transaction });
                // req.body.modulo.forEach(async (element: any) => {
                //     //*Validacion - Si no esta declaro el iIdRelModuloPermiso, le asigna cero(la base de datos ya le agrega el siguiente id)
                //     element.iIdRelModuloPermiso = element.iIdRelModuloPermiso == undefined ? 0 : element.iIdRelModuloPermiso;
                //     //Si ya existe la fila , la edita si tiene algo que editar o agrega en caso de que se agreguen permisos.
                //     await TblRelModulosPermisos.findOrCreate({ where: { iIdRelModuloPermiso: element.iIdRelModuloPermiso, iIdModulo: element.iIdModulo, iIdPermiso: element.iIdPermiso} });
                // }, transaction);
                yield transaction.commit();
                return res.json({
                    message: "Registro Modificado con Exito",
                    data: req.body
                });
                // }
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
                // if (!lRespuesta) {
                //     res.sendStatus(403);
                // } else {               
                transaction = yield database_1.sequelize.transaction();
                req.body.dtModificacion = Date.now();
                //*Validacion - itera el objeto y  algun elemento esta inactivado, lo activa y viceversa.
                req.body = req.body.map((item) => { item.lActivo = !item.lActivo; return item; });
                yield tblPuestoCliente_1.default.bulkCreate(req.body, { updateOnDuplicate: ['iIdPuestoCliente', 'lActivo'] }, { transaction });
                yield transaction.commit();
                return res.json({
                    message: "Registro Eliminado con Exito",
                    data: req.body
                });
                // }
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
exports.TBLPUESTOSCLIENTESCONTROLLER_CONTROLLER = new TblPuestosClientesController();
//# sourceMappingURL=TblPuestosClientesController.js.map