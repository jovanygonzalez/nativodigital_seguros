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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const tblPadronPersonas_1 = __importDefault(require("../models/tblPadronPersonas"));
const tblClientes_1 = __importDefault(require("../models/tblClientes"));
const tblEmpleados_1 = __importDefault(require("../models/tblEmpleados"));
class LoginController {
    /// <summary>METODO QUE SE ENCARGAR DE VALIDAR EN EL LOGIN SI EL USUARIO EXISTE
    /// <param>req</param> variable que contiene los parametros enviados al metodo
    /// <param>res</param> variable que contiene los tipos de respuestas que puede de devolver el metodo
    /// <return>Devuelve un arreglo de tipo json con objetos del tipo Usuarios</return>
    /// </summary>
    LoginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const SECRET_KEY = 'ñP5nd0r5123456ñ';
            console.log("starrrrrrt!!!!!!!!!!!t");
            console.log(req.body);
            console.log("starrrrrrt!!!!!!!!!!!t");
            //Hace una relacion de 1 a 1
            tblPadronPersonas_1.default.hasOne(tblClientes_1.default, { foreignKey: 'iIdPadron' });
            tblPadronPersonas_1.default.hasOne(tblEmpleados_1.default, { foreignKey: 'iIdPadron' });
            tblClientes_1.default.hasOne(tblPadronPersonas_1.default, { foreignKey: 'iIdPadron' });
            tblEmpleados_1.default.hasOne(tblPadronPersonas_1.default, { foreignKey: 'iIdPadron' });
            // Obtiene los datos junto con su tablas de relacion
            const lstRespuesta = yield tblPadronPersonas_1.default.findAll({
                where: { lActivo: 1 },
                include: [
                    // {
                    //     model: TblClientes,
                    //     where: { lActivo: 1 , cCorreoElectronico: req.body.cCorreoElectronico},
                    //     required: false
                    // }
                    {
                        model: tblEmpleados_1.default,
                        where: { lActivo: 1, cCorreoElectronico: req.body.cCorreoElectronico },
                        required: false
                    }
                ]
            });
            let datos = lstRespuesta.filter((item) => (item.tblCliente != null || item.tblEmpleado != null) ? item : null);
            if (datos == 0) {
                res.json({ error: 'Correo no válido' });
            }
            else {
                let cContrasena = datos[0].dataValues.tblEmpleado == null ? datos[0].dataValues.tblCliente.cContrasena : datos[0].dataValues.tblEmpleado.cContrasena;
                let cUsuario = datos[0].dataValues.tblEmpleado == null ? datos[0].dataValues.tblCliente.cUsuario : datos[0].dataValues.tblEmpleado.cUsuario;
                let cCorreoElectronico = datos[0].dataValues.tblEmpleado == null ? datos[0].dataValues.tblCliente.cCorreoElectronico : datos[0].dataValues.tblEmpleado.cCorreoElectronico;
                let lesCliente = datos[0].dataValues.tblEmpleado == null ? datos[0].dataValues.tblCliente.lesCliente : datos[0].dataValues.tblEmpleado.lesCliente;
                const pass = bcrypt_1.default.compareSync(req.body.cContrasena, cContrasena);
                if (pass) {
                    const expiresIn = 36000000; //milisegundos (10 hrs)
                    const accessToken = jsonwebtoken_1.sign({ id: datos[0].dataValues.iIdPatron }, SECRET_KEY, { expiresIn: '10h' });
                    const dataUser = {
                        iIdPadron: datos[0].dataValues.iIdPadron,
                        cUsuario: cUsuario,
                        cCorreoElectronico: cCorreoElectronico,
                        cToken: accessToken,
                        cExpiraEn: expiresIn,
                        lesCliente: lesCliente
                    };
                    // console.log(dataUser);
                    res.json(dataUser);
                }
                else {
                    res.json({ error: 'Contraseña no válida' });
                }
            }
        });
    }
}
exports.LOGIN_CONTROLLER = new LoginController();
//# sourceMappingURL=LoginController copy.js.map