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
const tblSolucionesAsistencias_1 = __importDefault(require("../models/tblSolucionesAsistencias"));
const tblRelSolucionesAsistencias_1 = __importDefault(require("../models/tblRelSolucionesAsistencias"));
const tblAsistencias_1 = __importDefault(require("../models/tblAsistencias"));
const VerificacionTokenController_1 = require("./VerificacionTokenController");
const database_1 = require("../database");
class TblSolucionesAsistenciasController {
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
            if (!lRespuesta) {
                res.sendStatus(403);
            }
            else {
                tblSolucionesAsistencias_1.default.belongsToMany(tblAsistencias_1.default, { through: tblRelSolucionesAsistencias_1.default, foreignKey: 'iIdSolucionAsistencia' });
                tblAsistencias_1.default.belongsToMany(tblSolucionesAsistencias_1.default, { through: tblRelSolucionesAsistencias_1.default, foreignKey: 'iIdAsistencia' });
                const lstRespuesta = yield tblSolucionesAsistencias_1.default.findAll({
                    where: { lActivo: 1 },
                    include: [
                        {
                            model: tblAsistencias_1.default,
                            required: false
                        }
                    ]
                });
                res.json({ data: lstRespuesta });
            }
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction;
            let lastIdSolucion;
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                if (!lRespuesta) {
                    res.sendStatus(403);
                }
                else {
                    transaction = yield database_1.sequelize.transaction();
                    req.body.dtCreacion = Date.now();
                    req.body.dtModificacion = Date.now();
                    //se inserta 
                    yield tblSolucionesAsistencias_1.default.create(req.body.solucion, { transaction }).then((result) => {
                        //guarda en una variable el id que se insertara en la base de datos.
                        lastIdSolucion = result.dataValues.iIdSolucionAsistencia;
                    });
                    //se asigna el id a la variable de relacion para luego agregarla a la base de datos.
                    req.body.asistencia.iIdSolucionAsistencia = lastIdSolucion;
                    //Inserta la lista de relacion en la base de datos
                    yield tblRelSolucionesAsistencias_1.default.create(req.body.asistencia, { transaction });
                    yield transaction.commit();
                    return res.json({
                        message: "Registro Insertado con Exito",
                        data: req.body
                    });
                }
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
                if (!lRespuesta) {
                    res.sendStatus(403);
                }
                else {
                    transaction = yield database_1.sequelize.transaction();
                    delete (req.body.solucion.dtCreacion);
                    req.body.solucion.dtModificacion = Date.now();
                    const respuesta = yield tblSolucionesAsistencias_1.default.update(req.body.solucion, { where: { iIdSolucionAsistencia: req.body.solucion.iIdSolucionAsistencia } });
                    if (respuesta) {
                        return res.json({
                            message: "Registro Modificado con Exito",
                            data: req.body
                        });
                    }
                }
            }
            catch (error) {
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
                    yield tblSolucionesAsistencias_1.default.bulkCreate(req.body, { updateOnDuplicate: ['iIdSolucionAsistencia', 'lActivo'] }, { transaction });
                    yield transaction.commit();
                    return res.json({
                        message: "Registro Eliminado con Exito",
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
}
exports.TBLSOLUCIONESASISTENCIAS_CONTROLLER = new TblSolucionesAsistenciasController();
//# sourceMappingURL=TblSolucionesAsistenciasController.js.map