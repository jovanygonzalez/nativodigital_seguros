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
const tblRoles_1 = __importDefault(require("../models/tblRoles"));
const tblRelPermisosRoles_1 = __importDefault(require("../models/tblRelPermisosRoles"));
const tblPermisos_1 = __importDefault(require("../models/tblPermisos"));
const VerificacionTokenController_1 = require("./VerificacionTokenController");
const database_1 = require("../database");
class TblRolesController {
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
            // if (!lRespuesta) {
            //     res.sendStatus(403);
            // } else {
            tblRoles_1.default.belongsToMany(tblPermisos_1.default, { through: tblRelPermisosRoles_1.default, foreignKey: 'iIdRol' });
            tblPermisos_1.default.belongsToMany(tblRoles_1.default, { through: tblRelPermisosRoles_1.default, foreignKey: 'iIdPermiso' });
            let lstRespuesta = [];
            if (req.query.lTodos == 'true') {
                lstRespuesta = yield tblRoles_1.default.findAll({
                    include: [
                        {
                            model: tblPermisos_1.default,
                            required: false
                        }
                    ]
                });
            }
            else if (req.query.lTodos == 'false') {
                lstRespuesta = yield tblRoles_1.default.findAll({
                    where: { lActivo: 1 },
                    include: [
                        {
                            model: tblPermisos_1.default,
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
            let lastIdRol;
            let resultado;
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                // if (!lRespuesta) {
                //     res.sendStatus(403);
                // } else {
                //Inicia la transanccion
                transaction = yield database_1.sequelize.transaction();
                //Se asigna la fecha
                req.body.dtCreacion = Date.now();
                req.body.dtModificacion = Date.now();
                //se inserta el nuevo rol
                yield tblRoles_1.default.create(req.body, { transaction }).then((result) => {
                    resultado = result.dataValues;
                    //guarda en una variable el id del rol que se insertara en la base de datos.
                    lastIdRol = result.dataValues.iIdRol;
                });
                //hace una iteracion con el arreglo de permisos y asigna el id del rol para la relacion
                req.body.tblPermisos = req.body.tblPermisos.map((item) => { item.iIdRol = lastIdRol; return item; });
                //Inserta la lista de relacion en la base de datos
                yield tblRelPermisosRoles_1.default.bulkCreate(req.body.tblPermisos, { transaction });
                //hace el commit si no hay errores
                yield transaction.commit();
                return res.json({
                    message: "Registro Insertado con Exito",
                    data: resultado
                });
                // }
            }
            catch (error) {
                //hace un rollback si hay errores
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
                //Se Declara la transaccion
                transaction = yield database_1.sequelize.transaction();
                //Actualiza la tabla de roles
                delete (req.body.dtCreacion);
                req.body.dtModificacion = Date.now();
                yield tblRoles_1.default.update(req.body, { where: { iIdRol: req.body.iIdRol }, transaction });
                //Elimina las relaciones de los permisos asignados al rol
                yield tblRelPermisosRoles_1.default.destroy({ where: { iIdRol: req.body.iIdRol }, transaction });
                //Realiza un iteracion de la lista de permiso de roles que recibe para editarlos
                yield transaction.commit();
                transaction = yield database_1.sequelize.transaction();
                req.body.tblPermisos.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield tblRelPermisosRoles_1.default.findOrCreate({ where: { iIdRol: req.body.iIdRol, iIdPermiso: element.iIdPermiso } });
                }), transaction);
                // ***ORIGINAL**
                // //Elimina las relaciones de los permisos asignados al rol
                // await TblRelPermisosRoles.destroy({ where: { iIdRol: req.body.rol.iIdRol }, transaction });
                // //Realiza un iteracion de la lista de permiso de roles que recibe para editarlos
                // req.body.permiso.forEach(async (element: any) => {
                //     //*Validacion - Si no esta declaro el iIdPermiso, le asigna cero(la base de datos ya le agrega el siguiente id)
                //     element.iIdPermiso = element.iIdPermiso == undefined ? 0 : element.iIdPermiso;
                //     //Si ya existe la fila , la edita si tiene algo que editar o agrega en caso de que se agreguen permisos.
                //     await TblRelPermisosRoles.findOrCreate({ where: { iIdRelPermisoRol: element.iIdRelPermisoRol, iIdRol: element.iIdRol, iIdPermiso: element.iIdPermiso } });
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
                yield tblRoles_1.default.bulkCreate(req.body, { updateOnDuplicate: ['iIdRol', 'lActivo'] }, { transaction });
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
exports.TBLROLES_CONTROLLER = new TblRolesController();
//# sourceMappingURL=TblRolesController.js.map