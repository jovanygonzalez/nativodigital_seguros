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
const tblSolucionesIncidentes_1 = __importDefault(require("../models/tblSolucionesIncidentes"));
const tblRelSolucionesIncidentes_1 = __importDefault(require("../models/tblRelSolucionesIncidentes"));
const tblIncidentes_1 = __importDefault(require("../models/tblIncidentes"));
const VerificacionTokenController_1 = require("./VerificacionTokenController");
const database_1 = require("../database");
class TblSolucionesIncidentesController {
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
            if (!lRespuesta) {
                res.sendStatus(403);
            }
            else {
                tblSolucionesIncidentes_1.default.belongsToMany(tblIncidentes_1.default, { through: tblRelSolucionesIncidentes_1.default, foreignKey: 'iIdSolucionIncidente' });
                tblIncidentes_1.default.belongsToMany(tblSolucionesIncidentes_1.default, { through: tblRelSolucionesIncidentes_1.default, foreignKey: 'iIdIncidente' });
                const lstRespuesta = yield tblSolucionesIncidentes_1.default.findAll({
                    where: { lActivo: 1 },
                    include: [
                        {
                            model: tblIncidentes_1.default,
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
                    req.body.solucion.dtCreacion = Date.now();
                    req.body.solucion.dtModificacion = Date.now();
                    //se inserta 
                    yield tblSolucionesIncidentes_1.default.create(req.body.solucion, { transaction }).then((result) => {
                        //guarda en una variable el id que se insertara en la base de datos.
                        lastIdSolucion = result.dataValues.iIdSolucionIncidente;
                    });
                    //se asigna el id a la variable de relacion para luego agregarla a la base de datos.
                    req.body.incidente.iIdSolucionIncidente = lastIdSolucion;
                    //Inserta la lista de relacion en la base de datos
                    yield tblRelSolucionesIncidentes_1.default.create(req.body.incidente, { transaction });
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
                    //Se Declara la transaccion
                    transaction = yield database_1.sequelize.transaction();
                    delete (req.body.solucion.dtCreacion);
                    req.body.solucion.dtModificacion = Date.now();
                    yield tblSolucionesIncidentes_1.default.update(req.body.solucion, { where: { iIdSolucionIncidente: req.body.solucion.iIdSolucionIncidente }, transaction });
                    return res.json({
                        message: "Registro Modificado con Exito",
                        data: req.body.solucion
                    });
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
                    req.body.solucion = req.body.solucion.map((item) => { item.lActivo = !item.lActivo; return item; });
                    yield tblSolucionesIncidentes_1.default.bulkCreate(req.body.solucion, { updateOnDuplicate: ['iIdSolucionIncidente', 'lActivo'] }, { transaction });
                    yield transaction.commit();
                    return res.json({
                        message: "Registro Eliminado con Exito",
                        data: req.body.solucion
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
exports.TBLSOLUCIONESINCIDENTES_CONTROLLER = new TblSolucionesIncidentesController();
//# sourceMappingURL=TblSolucionesIncidentesController.js.map