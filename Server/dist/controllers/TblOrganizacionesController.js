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
const tblOrganizaciones_1 = __importDefault(require("../models/tblOrganizaciones"));
const tblServicios_1 = __importDefault(require("../models/tblServicios"));
const tblUnegocios_1 = __importDefault(require("../models/tblUnegocios"));
const tblRelOrganizacionServicios_1 = __importDefault(require("../models/tblRelOrganizacionServicios"));
const tblRelOrganizacionUnegocio_1 = __importDefault(require("../models/tblRelOrganizacionUnegocio"));
const VerificacionTokenController_1 = require("./VerificacionTokenController");
const database_1 = require("../database");
class TblOrganizacionesController {
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
            // if (!lRespuesta) {
            //     res.sendStatus(403);
            // } else {
            //Hace la relacion de muchos a muchos a traves de la tabla de relacion TblRelOrganizacionServicios
            tblOrganizaciones_1.default.belongsToMany(tblServicios_1.default, {
                through: tblRelOrganizacionServicios_1.default,
                foreignKey: "iIdOrganizacion"
            });
            tblServicios_1.default.belongsToMany(tblOrganizaciones_1.default, {
                through: tblRelOrganizacionServicios_1.default,
                foreignKey: "iIdServicio"
            });
            //Hace la relacion de muchos a muchos a traves de la tabla de relacion TblRelOrganizacionUnegocios
            tblOrganizaciones_1.default.belongsToMany(tblUnegocios_1.default, {
                through: tblRelOrganizacionUnegocio_1.default,
                foreignKey: "iIdOrganizacion"
            });
            tblUnegocios_1.default.belongsToMany(tblOrganizaciones_1.default, {
                through: tblRelOrganizacionUnegocio_1.default,
                foreignKey: "iIdUnegocio"
            });
            let lstRespuesta = [];
            if (req.query.lTodos == "true") {
                lstRespuesta = yield tblOrganizaciones_1.default.findAll({
                    include: [
                        {
                            model: tblServicios_1.default,
                            required: false
                        },
                        {
                            model: tblUnegocios_1.default,
                            required: false
                        }
                    ]
                });
            }
            if (req.query.lTodos == "false") {
                lstRespuesta = yield tblOrganizaciones_1.default.findAll({
                    where: { lActivo: 1 },
                    include: [
                        {
                            model: tblServicios_1.default,
                            required: false
                        },
                        {
                            model: tblUnegocios_1.default,
                            required: false
                        }
                    ]
                });
            }
            res.json({ data: lstRespuesta });
            // }
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            let lastIdOrganizacion;
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                // if (!lRespuesta) {
                //     res.sendStatus(403);
                // } else {
                transaction = yield database_1.sequelize.transaction();
                req.body.dtCreacion = Date.now();
                req.body.dtModificacion = Date.now();
                yield tblOrganizaciones_1.default.create(req.body, { transaction }).then((result) => {
                    //Obtiene el siguiente Id de la organizacion a insertar en la base de datos.
                    lastIdOrganizacion = result.dataValues.iIdOrganizacion;
                });
                //Inserta la relacion de Organizacion con servicios
                //Hace una iteracion, asignado el siguiente Id de la organizacion a cada elemento(servicio) que reciba de la lista.
                // req.body.servicio = req.body.servicio.map((item: any) => { item.iIdOrganizacion = lastIdOrganizacion; return item });
                // req.body.servicio.iIdOrganizacion = lastIdOrganizacion;
                // await TblRelOrganizacionServicios.bulkCreate(req.body.servicio, { transaction });
                //Inserta la relacion de Organizacion con unidades de negocios
                //Hace una iteracion, asignado el siguiente Id de la organizacion a cada elemento(unidad de negocio) que reciba de la lista.
                req.body.tblUnegocios = req.body.tblUnegocios.map((item) => {
                    item.iIdOrganizacion = lastIdOrganizacion;
                    return item;
                });
                req.body.tblUnegocios.iIdOrganizacion = lastIdOrganizacion;
                yield tblRelOrganizacionUnegocio_1.default.bulkCreate(req.body.tblUnegocios, {
                    transaction
                });
                //Si todo los datos estan bien, hace el commit a la transaccion de todos los insert.
                yield transaction.commit();
                return res.json({
                    message: "Registro Insertado con Exito",
                    data: req.body
                });
                // }
            }
            catch (error) {
                //
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
                yield tblOrganizaciones_1.default.update(req.body, {
                    where: { iIdOrganizacion: req.body.iIdOrganizacion },
                    transaction
                });
                //Actualiza las tablas de relacion de servicios y unidades de negocio
                //bulkCreate es para insercion de muchos datos en una lista, pero con la propiedad updateOnDuplicate, la actualiza
                // await TblRelOrganizacionServicios.bulkCreate(req.body.servicio, { updateOnDuplicate: ['iIdRelOrganizacionServicio', 'iIdOrganizacion', 'iIdServicio'] }, { transaction });
                // await TblRelOrganizacionUnegocios.bulkCreate(req.body.tblUnegocios, { updateOnDuplicate: ['iIdRelOrganizacionUnegocio', 'iIdOrganizacion', 'iIdUnegocio'] }, { transaction });
                // //Elimina las relaciones de los servicios asignados al cliente
                yield tblRelOrganizacionUnegocio_1.default.destroy({
                    where: { iIdOrganizacion: req.body.iIdOrganizacion },
                    transaction
                });
                // //Realiza un iteracion de la lista de permiso de servicios que recibe para editarlos
                yield transaction.commit();
                transaction = yield database_1.sequelize.transaction();
                req.body.tblUnegocios.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield tblRelOrganizacionUnegocio_1.default.findOrCreate({
                        where: {
                            iIdOrganizacion: req.body.iIdOrganizacion,
                            iIdUnegocio: element.iIdUnegocio
                        }
                    });
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
                yield tblOrganizaciones_1.default.bulkCreate(req.body, { updateOnDuplicate: ["iIdOrganizacion", "lActivo"] }, { transaction });
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
exports.TBLORGANIZACIONES_CONTROLLER = new TblOrganizacionesController();
//# sourceMappingURL=TblOrganizacionesController.js.map