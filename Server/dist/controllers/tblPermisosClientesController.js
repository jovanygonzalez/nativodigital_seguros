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
const tblPermisosClientes_1 = __importDefault(require("../models/tblPermisosClientes"));
const tblRelPermisosClientesServicios_1 = __importDefault(require("../models/tblRelPermisosClientesServicios"));
const tblServicios_1 = __importDefault(require("../models/tblServicios"));
const VerificacionTokenController_1 = require("./VerificacionTokenController");
const database_1 = require("../database");
class TblPermisosClientesController {
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
            tblPermisosClientes_1.default.belongsToMany(tblServicios_1.default, { through: tblRelPermisosClientesServicios_1.default, foreignKey: 'iIdPermisoCliente' });
            tblServicios_1.default.belongsToMany(tblPermisosClientes_1.default, { through: tblRelPermisosClientesServicios_1.default, foreignKey: 'iIdServicio' });
            let lstRespuesta = [];
            if (req.query.lTodos == "true") {
                lstRespuesta = yield tblPermisosClientes_1.default.findAll({
                    include: [
                        {
                            model: tblServicios_1.default,
                            required: false
                        }
                    ]
                });
            }
            if (req.query.lTodos == "false") {
                lstRespuesta = yield tblPermisosClientes_1.default.findAll({
                    where: { lActivo: 1 },
                    include: [
                        {
                            model: tblServicios_1.default,
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
            let transaction;
            let lastIdPermisoCliente;
            let lastIdCliente;
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                // if (!lRespuesta) {
                //     res.sendStatus(403);
                // } else {
                transaction = yield database_1.sequelize.transaction();
                req.body.dtCreacion = Date.now();
                req.body.dtModificacion = Date.now();
                yield tblPermisosClientes_1.default.create(req.body, { transaction }).then((result) => {
                    //Obtiene el siguiente Id de la organizacion a insertar en la base de datos.
                    lastIdPermisoCliente = result.dataValues.iIdPermisoCliente;
                    lastIdCliente = result.dataValues.iIdCliente;
                });
                // Inserta la relacion de servicios con permisos/clientes
                // Hace una iteracion, asignado el siguiente Id del clinte a cada elemento(servicio) que reciba de la lista.
                req.body.tblServicios = req.body.tblServicios.map((item) => {
                    item.iIdCliente = lastIdCliente;
                    item.iIdPermisoCliente = lastIdPermisoCliente;
                    return item;
                });
                yield tblRelPermisosClientesServicios_1.default.bulkCreate(req.body.tblServicios, { transaction });
                //Si todo los datos estan bien, hace el commit a la transaccion de todos los insert.
                yield transaction.commit();
                return res.json({
                    message: "Registro Insertado con Exito",
                    data: req.body
                });
                // }
            }
            catch (error) {
                //Si todo los datos estan mal, hace rollback a la transaccion de todos los insert.
                if (transaction)
                    yield transaction.rollback();
                res.status(500).json({
                    message: "Ocurrio un error " + error
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
                //Actualiza la tabla de Organizaciones
                // elimina date creacion del objeto
                delete req.body.dtCreacion;
                req.body.dtModificacion = Date.now();
                yield tblPermisosClientes_1.default.update(req.body, {
                    where: { iIdPermisoCliente: req.body.iIdPermisoCliente, iIdCliente: req.body.iIdCliente },
                    transaction
                });
                //Elimina las relaciones de los permisos asignados al rol
                yield tblRelPermisosClientesServicios_1.default.destroy({ where: { iIdPermisoCliente: req.body.iIdPermisoCliente }, transaction });
                //Realiza un iteracion de la lista de permiso de roles que recibe para editarlos
                yield transaction.commit();
                transaction = yield database_1.sequelize.transaction();
                req.body.tblServicios.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield tblRelPermisosClientesServicios_1.default.findOrCreate({ where: { iIdPermisoCliente: req.body.iIdPermisoCliente, iIdServicio: element.iIdServicio, iIdCliente: req.body.iIdCliente } });
                }), transaction);
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
                yield tblPermisosClientes_1.default.bulkCreate(req.body, { updateOnDuplicate: ["iIdPermisoCliente, iIdCliente", "lActivo"] }, { transaction });
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
                    message: "Ocurrio un error " + error
                });
            }
        });
    }
}
exports.TBLPERMISOSCLIENTESCONTROLLER_CONTROLLER = new TblPermisosClientesController();
//# sourceMappingURL=TblPermisosClientesController.js.map