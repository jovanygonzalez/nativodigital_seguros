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
const tblClientes_1 = __importDefault(require("../models/tblClientes"));
const tblPadronPersonas_1 = __importDefault(require("../models/tblPadronPersonas"));
const tblOrganizaciones_1 = __importDefault(require("../models/tblOrganizaciones"));
const tblPermisosClientes_1 = __importDefault(require("../models/tblPermisosClientes"));
const tblRelPermisosClientesServicios_1 = __importDefault(require("../models/tblRelPermisosClientesServicios"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const VerificacionTokenController_1 = require("./VerificacionTokenController");
const database_1 = require("../database");
class TblClientesController {
    /// <summary>METODO QUE OBTIENE TODOS LOS REGISTROS DE LA TABLA tblClientes.
    /// <param>req</param> variable que contiene los parametros enviados al metodo
    /// <param>req</param> variable que contiene los tipos de respuestas que puede de devolver el metodo
    /// <return>Devuelve un arreglo con varios objetos del tipo tblClientes.</return>
    /// </summary>
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
            // if (!lRespuesta) {
            //     res.sendStatus(403);
            // } else {
            tblClientes_1.default.belongsTo(tblOrganizaciones_1.default, { foreignKey: 'iIdOrganizacion' });
            tblClientes_1.default.belongsToMany(tblPermisosClientes_1.default, { through: tblRelPermisosClientesServicios_1.default, foreignKey: 'iIdCliente' });
            tblPermisosClientes_1.default.belongsToMany(tblClientes_1.default, { through: tblRelPermisosClientesServicios_1.default, foreignKey: 'iIdPermisoCliente' });
            let lstRespuesta = [];
            if (req.query.lTodos == 'true') {
                lstRespuesta = yield tblClientes_1.default.findAll({
                    include: [
                        {
                            model: tblOrganizaciones_1.default,
                            where: { lActivo: 1 },
                            required: false
                        },
                        {
                            model: tblPermisosClientes_1.default,
                            where: { lActivo: 1 },
                            required: false
                        }
                    ]
                });
            }
            if (req.query.lTodos == 'false') {
                lstRespuesta = yield tblClientes_1.default.findAll({
                    where: { lActivo: 1 },
                    include: [
                        {
                            model: tblOrganizaciones_1.default,
                            where: { lActivo: 1 },
                            required: false
                        },
                        {
                            model: tblPermisosClientes_1.default,
                            where: { lActivo: 1 },
                            required: false
                        }
                    ]
                });
            }
            res.json({ data: lstRespuesta });
            //};
        });
    }
    /// <summary>METODO QUE CREAR UN REGISTRO EN LA TABLA tblClientes.
    /// <param>req</param> variable que contiene los parametros enviados al metodo
    /// <param>req</param> variable que contiene los tipos de respuestas que puede de devolver el metodo
    /// <return>Devuelve un JSON con un mensaje y el registro insertado.</return>
    /// </summary>
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            let lastIdCliente;
            let resultado;
            console.log(req);
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                // if (!lRespuesta) {
                //     res.sendStatus(403);
                // } else {
                transaction = yield database_1.sequelize.transaction();
                req.body.cCorreoElectronico = req.body.cCorreoElectronico.toString();
                req.body.dtCreacion = Date.now();
                req.body.dtModificacion = Date.now();
                req.body.cContrasena = bcrypt_1.default.hashSync(req.body.cContrasena, 10); //contraseña encriptada
                yield tblClientes_1.default.create(req.body, { transaction }).then((result) => {
                    resultado = result.dataValues;
                    lastIdCliente = result.dataValues.iIdCliente;
                });
                //Actualiza lAsignado de la tabla de padron para saber si un padron ya esta asignado como empleado
                yield tblPadronPersonas_1.default.update({ lAsignado: 1 }, { where: { iIdPadron: req.body.iIdPadron }, transaction });
                //Asigna el id del cliente a insertar par hacer la realcion
                // req.body.iIdCliente = lastIdCliente;
                // await TblRelClientesOrganizaciones.create(req.body, { transaction });
                // //Asigna el id del cliente a insertar par hacer la realcion
                // req.body.permiso = req.body.permiso.map((item: any) => { item.iIdPermisoCliente = lastIdCliente; return item });
                // req.body.permiso.iIdCliente = lastIdCliente;
                // await TblRelPermisosClientesServicios.bulkCreate(req.body.permiso, { transaction });
                //Si todo esta correcto, hace el commit de los inserts
                yield transaction.commit();
                return res.json({
                    message: "Registro Insertado con Exito",
                    data: resultado
                });
                // }
            }
            catch (error) {
                //Si hay algun dato erroneo, hace un rollback
                if (transaction)
                    yield transaction.rollback();
                res.status(500).json({
                    message: 'ocurrio un error' + error
                });
            }
        });
    }
    /// <summary>METODO QUE MODIFICA UN REGISTRO EN LA TABLA tblClientes.
    /// <param>req</param> variable que contiene los parametros enviados al metodo
    /// <param>req</param> variable que contiene los tipos de respuestas que puede de devolver el metodo
    /// <return>Devuelve un JSON con un mensaje y el registro Modificado.</return>
    /// </summary>
    editar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                // if (!lRespuesta) {
                //     res.sendStatus(403);
                // } else {
                //Se Declara la transaccion
                transaction = yield database_1.sequelize.transaction();
                //Se encripta la contraseña en caso de que se cambie
                req.body.cContrasena = bcrypt_1.default.hashSync(req.body.cContrasena, 10); //contraseña encriptada
                //Actualiza la tabla de clientes
                delete (req.body.dtCreacion);
                req.body.dtModificacion = Date.now();
                yield tblClientes_1.default.update(req.body, { where: { iIdCliente: req.body.iIdCliente }, transaction });
                //Actualiza la relacion del cliente con la organizacion que se le asigne
                //await TblRelClientesOrganizaciones.update(req.body.tblOrganizaciones['0'], { where: { iIdRelClienteOrganizacion: req.body.tblOrganizaciones[0].tblRelClientes_Organizaciones.iIdRelClienteOrganizacion }, transaction });
                // //Elimina las relaciones de los servicios asignados al cliente
                // await TblRelPermisosClientesServicios.destroy({ where: { iIdCliente: req.body.iIdCliente }, transaction });
                // //Realiza un iteracion de la lista de permiso de servicios que recibe para editarlos
                // req.body.permiso.forEach(async (element: any) => {
                //     //*Validacion - Si no esta declaro el iIdRelPermisoServicio, le asigna cero(la base de datos ya le agrega el siguiente id)
                //     element.iIdRelPermisoServicio = element.iIdRelPermisoServicio == undefined ? 0 : element.iIdRelPermisoServicio;
                //     //Si ya existe la fila , la edita si tiene algo que editar o agrega en caso de que se agreguen permisos.
                //     await TblRelPermisosClientesServicios.findOrCreate({ where: { iIdRelPermisoServicio: element.iIdRelPermisoServicio, iIdPermisoCliente: element.iIdPermisoCliente, iIdServicio: element.iIdServicio, iIdCliente: element.iIdCliente } });
                // }, transaction);
                //Si todos los datos estan bien, hace el commit de todas las operaciones.
                yield transaction.commit();
                return res.json({
                    message: "Registro Modificado con Exito",
                    data: req.body
                });
                // }
            }
            catch (error) {
                //Si hay algun dato malo, hace un rollback(cancela todas las operaciones)
                if (transaction)
                    yield transaction.rollback();
                res.status(500).json({
                    message: 'ocurrio un error ' + error
                });
            }
        });
    }
    /// <summary>METODO QUE ELIMINA UN REGISTRO EN LA TABLA tblClientes.
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
                yield tblClientes_1.default.bulkCreate(req.body, { updateOnDuplicate: ['iIdCliente', 'lActivo'] }, { transaction });
                //Obtener el o los Ids de los datos a inactivar para actualizar otras tablas
                let iIdPadron = req.body.map((x) => x.iIdPadron);
                //Actualiza las tablas realcionadas
                req.body.map((x) => {
                    x.lActivo == true ? 1 : 0;
                    //Actualiza la tabla de padron 
                    tblPadronPersonas_1.default.update({ lAsignado: x.lActivo }, { where: { iIdPadron: iIdPadron } });
                }, { transaction });
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
                    message: 'ocurrio un error'
                });
            }
        });
    }
}
exports.TBLCLIENTES_CONTROLLER = new TblClientesController();
//# sourceMappingURL=TblClientesfController.js.map