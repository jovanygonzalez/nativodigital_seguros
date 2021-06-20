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
const tblUnegocios_1 = __importDefault(require("../models/tblUnegocios"));
const tblPuestos_1 = __importDefault(require("../models/tblPuestos"));
const tblRelUnegocioPuestos_1 = __importDefault(require("../models/tblRelUnegocioPuestos"));
const database_1 = require("../database");
const VerificacionTokenController_1 = require("./VerificacionTokenController");
class TblUnegociosController {
    obtener(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
            // if (!lRespuesta) {
            //     res.sendStatus(403);
            // } else {
            tblUnegocios_1.default.belongsToMany(tblPuestos_1.default, { through: tblRelUnegocioPuestos_1.default, foreignKey: "iIdUnegocio" });
            tblPuestos_1.default.belongsToMany(tblUnegocios_1.default, { through: tblRelUnegocioPuestos_1.default, foreignKey: "iIdPuesto" });
            let lstRespuesta = [];
            if (req.query.lTodos == "true") {
                lstRespuesta = yield tblUnegocios_1.default.findAll({
                    include: [
                        {
                            model: tblPuestos_1.default,
                            required: false
                        }
                    ]
                });
            }
            else if (req.query.lTodos == "false") {
                lstRespuesta = yield tblUnegocios_1.default.findAll({
                    where: { lActivo: 1 },
                    include: [
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
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("starth here");
            console.log(req.body);
            console.log("starth here");
            let transaction;
            let lastIdUnegocio;
            // let resultado;
            try {
                const lRespuesta = yield VerificacionTokenController_1.VERIFICACIONTOKEN_CONTROLLER.VerificarToken(req, res);
                let resultado;
                // if (!lRespuesta) {
                //  res.sendStatus(403);
                // } else {
                //Inicia la transacción
                transaction = yield database_1.sequelize.transaction();
                //Se asigna la fecha
                req.body.dtCreacion = Date.now();
                req.body.dtModificacion = Date.now();
                //Se inserta la nueva unidad de negocio
                yield tblUnegocios_1.default.create(req.body, { transaction }).then((result) => __awaiter(this, void 0, void 0, function* () {
                    resultado = result.dataValues;
                    //obtiene el siguiente id que se insertara en la base de datos
                    lastIdUnegocio = result.dataValues.iIdUnegocio;
                }));
                //Hace una iteración con el arreglo de puestos y le asigna el id de unidades de negocio para la relación
                //   req.body.puestoUnidad = req.body.puestoUnidad.map((item: any) => {
                //   item.iIdUnegocio = lastIdUnegocio;
                //   return item;
                // });
                // //BulkCreate = para guardar arreglos, Json
                // await TblRelUnegocioPuesto.bulkCreate(req.body.puestoUnidad, { transaction });
                //Si no hay errores se realiza el commit
                yield transaction.commit();
                res.json({
                    message: "Registro Insertado con Exito",
                    data: resultado
                });
                // }
            }
            catch (error) {
                //Rollback si existe errores
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
                // Actualiza la tabla de Unegocios
                //   elimina date creacion del objeto
                delete req.body.dtCreacion;
                //req.body.unegocio.dtModificacion = Date.now();
                // bulkCreate es para insercion de muchos datos en una lista, pero con la propiedad updateOnDuplicate, la actualiza
                yield tblUnegocios_1.default.update(req.body, { where: { iIdUnegocio: req.body.iIdUnegocio }, transaction });
                // await TblRelUnegocioPuesto.bulkCreate(req.body.puestoUnidad, {
                //   updateOnDuplicate: ["iIdRelUnegocioPuesto", "iIdUnegocio", "iIdPuesto"]
                // }, { transaction });
                yield transaction.commit();
                res.json({
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
            console.log("starth here");
            console.log(req.body);
            console.log("starth here");
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
                yield tblUnegocios_1.default.bulkCreate(req.body, { updateOnDuplicate: ["iIdUnegocio", "lActivo"] }, { transaction });
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
exports.TBLUNEGOCIOS_CONTROLLER = new TblUnegociosController();
//# sourceMappingURL=TblUnegociosController.js.map